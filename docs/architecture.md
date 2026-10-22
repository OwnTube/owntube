# Architecture and reverse-engineering notes

OwnTube runs the official YouTube desktop web client and YouTube Studio against its own server. It does not rebuild either frontend. The client's HTML, JavaScript, CSS and images are archived from YouTube at a pinned build and served byte for byte, except for the documented edits in [client-patches.md](client-patches.md). Everything the client asks the server for (pages, InnerTube API calls, thumbnails, media) is answered from PostgreSQL and local media.

The only pages OwnTube writes itself are sign-in and sign-up (local accounts, styled after Google's account pages) and the operator admin panel.

## Request flow

```
browser ── /, /watch, /@handle, /results ...  ─▶ pageFor()  ─▶ pinned page shell + ytcfg/ytInitialData from Postgres
        ── /s/..., /_up/<host>/...            ─▶ archived assets (+ serve-time patches)
        ── /youtubei/v1/<method>              ─▶ InnerTube router ─▶ handlers ─▶ templates filled from Postgres
        ── /videoplayback?id&itag&range       ─▶ local media files (byte ranges, optional UMP framing)
        ── /vi/<id>/<name>.jpg                ─▶ local thumbnails
        ── /signin, /register, /admin         ─▶ OwnTube's own pages

studio host ── same split for Studio's shell, assets, /youtubei/v1 and the resumable /upload/studio endpoint
```

[`src/server.ts`](../src/server.ts) chooses between the main client and Studio by the request's Host header (`STUDIO_ORIGIN`), so one process can serve both on one or two ports.

## The pinned client

- [`scripts/fetch-client.ts`](../scripts/fetch-client.ts) downloads the desktop page, the main bundle, lazily loaded modules, the player (`base.js`), stylesheets, fonts and every static image the bundle names. It records each asset's URL and SHA-256 in [`pin/client.json`](../pin/client.json) and stores the bytes unmodified in `client/original/` (patched output is cached in `client/patched/`, ignored by Git). `--check` verifies the archive against the pin; `--update` deliberately moves to a newer build.
- [`scripts/fetch-studio.ts`](../scripts/fetch-studio.ts) does the same for Studio from a signed-in page capture, which it sanitizes (account ids, names, tokens) before archiving.
- Assets on other hosts (`www.gstatic.com`, `fonts.gstatic.com`, `fonts.googleapis.com`) are served under `/_up/<host>/...`. The patches in [client-patches.md](client-patches.md) point the client at those paths.
- `UPSTREAM_ASSET_FETCH=1` lets a development instance fetch an asset missing from the archive. It is off by default; a normal instance never contacts YouTube.

## Pages

A page load returns the pinned page with these parts replaced ([`src/client/page.ts`](../src/client/page.ts)):

- `ytcfg.set({...})`: the pinned build's configuration with this instance's origin, API key, client version, the viewer's session state (`LOGGED_IN`, `DATASYNC_ID`), appearance, and a short list of experiment-flag overrides.
- `ytInitialData` and `ytInitialPlayerResponse`: the same responses `browse`, `next` and `player` would return for that URL.
- `window.ytPageType`, `ytCommand`, `ytUrl`: the page's navigation endpoint, so the client boots into the right page.
- Nonces, Google-hosted URLs, the title and social metadata.

Each replacement is a named rule that must match. A rule that misses is recorded in the admin panel's Compatibility page.

After the first load the client navigates in-page through InnerTube (`browse`, `next`, `player`, `search`, `navigation/resolve_url`), as on YouTube.

## InnerTube responses

Handlers are registered by method name in [`src/innertube/router.ts`](../src/innertube/router.ts). An unregistered method gets an empty envelope (`{responseContext}`) and is listed under "Unhandled requests" in the admin panel.

Response structures come from YouTube. [`scripts/make-templates.ts`](../scripts/make-templates.ts) reduces private captures (`captures/`, gitignored) to templates in [`src/innertube/templates/`](../src/innertube/templates/): tracking fields removed, lists cut to one sample per kind, and the sample's ids, names, counts, images and links replaced by `{{TOKENS}}`. The script fails if any sample value, Google media URL or personal value from a signed-in capture survives. Handlers clone a template and fill the tokens from the database ([`src/innertube/tpl.ts`](../src/innertube/tpl.ts)). The client formats nothing itself, so counts and dates are formatted server-side as YouTube does.

The endpoint-by-endpoint map is in [compat/endpoints.md](compat/endpoints.md).

## Accounts and request signing

Accounts are local to the instance; the sign-in form never asks for a Google password ([`src/auth.ts`](../src/auth.ts)). A session sets:

- `OT_SID`: httpOnly, identifies the session.
- `SAPISID` (or `APISID` on plain http): the session's API secret, readable by page script.

The official client signs each InnerTube request with `Authorization: SAPISIDHASH <ts>_<sha1(ts secret origin)>`. A page on another origin cannot read the secret, so mutating InnerTube methods require a valid signature and that doubles as the CSRF check. `COOKIE_DOMAIN` shares the session between the main host and the Studio host.

## Appearance

The client keeps its Appearance choice in the `PREF` cookie: flag 165 (`f6` bit `0x400`) is Dark theme, flag 174 (`0x80000`) Light theme, neither is device theme. The server reads it before rendering ([`src/appearance.ts`](../src/appearance.ts)) and sets `<html dark>` and `INNERTUBE_CONTEXT.client.userInterfaceTheme`, as YouTube does. For device theme it asks for the `Sec-CH-Prefers-Color-Scheme` client hint. `ALT_PREF_COOKIE_DOMAIN` is set to this instance's cookie domain so the client's writes stick. The admin panel's Appearance menu writes the same flags.

## Media

- Uploads arrive through Studio's resumable upload protocol ([`src/studio/upload.ts`](../src/studio/upload.ts)) and are processed by an in-process worker ([`src/media/process.ts`](../src/media/process.ts)) with FFmpeg into the formats the player requests: itag 18 progressive MP4, H.264/MP4 and VP9/WebM DASH ladders up to the source height, AAC (140) and Opus (251) audio, and thumbnails at YouTube's names and sizes.
- `player` returns `streamingData` pointing at `/videoplayback?id&itag`. [`src/media/serve.ts`](../src/media/serve.ts) answers `range=` requests and, when the player asks for `ump=1`, wraps the bytes in UMP parts ([`src/media/ump.ts`](../src/media/ump.ts)). UMP is turned off by a player flag override, so the plain path is the normal one.
- The player's proof-of-origin token generation is turned off (no BotGuard is loaded), and the `att/get` challenge carries no program.

## Studio

Studio runs as the pinned creator client on its own origin ([`src/studio/`](../src/studio/)). Its channel data is prefetched into the page as Studio expects. Notes from tracing the bundle:

- A video's owner needs `CREATOR_VIDEO_PERMISSION_WATCH` among its permissions; without it Studio lists the video as "[Private video]".
- Drafts are recognised by a `draftStatus` other than `DRAFT_STATUS_NONE`.
- `video/delete` must answer `{success: true}`; bulk delete enqueues and is polled with `creator/check_creator_bulk_delete` until `BULK_ACTION_STATUS_DONE`.
- While a video uploads or processes, `statusDetails.feedbackServiceContinuationToken` makes Studio poll `upload/feedback`, whose items carry transfer progress, per-resolution processing state and, once done, thumbnails ([`src/studio/feedback.ts`](../src/studio/feedback.ts)). No copyright or guidelines checks run, so Studio shows its own "Checks complete" state.

## Badges and marks

Operators can verify a channel or mark it as an Official Artist Channel, and give an account the YouTube Premium logo (`channels.verification`, `users.premium`). Item templates leave out the captured channels' badges; [`src/innertube/badges.ts`](../src/innertube/badges.ts) puts YouTube's own badge structures (templates from the captures, step `badges` in make-templates) into every response that names a verified channel, after the response is built, so each builder gets them without its own code. The client draws the badges from them: `metadataBadgeRenderer` on older renderers, an icon on a lockup's channel-name part, an image attached after the name in a channel header, and `isVerified` / `isArtist` on comment authors. The Premium logo is the topbar logo's icon type (`YOUTUBE_PREMIUM_LOGO`).

## GIFs in comments

YouTube's desktop client already draws a GIF under a comment: `commentSurfaceEntity.imageAttachmentViewModel.commentImageAttachmentViewModel` (`image.sources`, `aspectRatio`, an accessibility label) is rendered by `ytw-comment-image-attachment-view-model`. It has no way to pick one, so with `KLIPY_API_KEY` set the page gets [`assets/gifs.js`](../assets/gifs.js) (page rule `gif-picker`): a GIF button after the composer's emoji button and a picker above the box, styled in YouTube's light and dark colours (the pinned build's own colour variables have generated names). [`src/gifs.ts`](../src/gifs.ts) proxies KLIPY search and trending with the server's key, returns each result with a token the instance signs, caches GIF files in `MEDIA_DIR/gifs`, and stores starred GIFs per account (`gif_favorites`). The picker adds the token to the create-comment request as `owntubeGif`; [`comments.ts`](../src/innertube/comments.ts) accepts only signed tokens and stores the GIF in `comments.gif`. A comment may then have no text; the zero-width space the picker types into an empty box, so the client enables Comment, is dropped.

The idea comes from the desktop_gifs browser extension; this is a separate implementation (its code is GPL-licensed and isn't used).

## Admin panel

`/admin` ([`src/admin/`](../src/admin/)) is server-rendered HTML. Operators only: anyone else gets a 404. Every mutation is a same-origin POST with the session's form token and is recorded in `admin_actions`. See the README for what each page does.

## Diagnostics

[`src/diagnostics.ts`](../src/diagnostics.ts) records what the instance could not answer: unregistered InnerTube methods, browse ids, unmatched page rules, client errors (`/error_204`), CSP reports, and patch counts that differ from the expected ones. The Compatibility page in the admin panel shows them and exports them as JSON. A successful response alone does not show that a feature works; check the page in a browser.

## Service worker

The pinned client registers a service worker for offline shell caching. A worker that outlives a client upgrade would keep serving old bundles, so the worker flags are turned off and `/sw.js` answers with a worker that unregisters itself and clears its caches.
