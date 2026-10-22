<p align="center">
  <img src="docs/images/owntube-logo.png" width="144" height="144" alt="OwnTube: a widened white scribbled play triangle on red" />
</p>

<h1 align="center">OwnTube</h1>

<p align="center">
  <strong>YouTube's web client. Your server.</strong>
</p>

<p align="center">
  An independent, self-hosted backend for the actual YouTube web client.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-early_alpha-f52027?style=flat-square" alt="Status: early alpha" />
  <img src="https://img.shields.io/badge/runtime-Bun-141414?style=flat-square" alt="Runtime: Bun" />
  <img src="https://img.shields.io/badge/database-PostgreSQL-4169e1?style=flat-square" alt="Database: PostgreSQL" />
</p>

<p align="center">
  <a href="#current-status">Status</a> &nbsp;·&nbsp;
  <a href="#self-hosting">Self-hosting</a> &nbsp;·&nbsp;
  <a href="#youtube-studio">Studio</a> &nbsp;·&nbsp;
  <a href="#development">Development</a> &nbsp;·&nbsp;
  <a href="https://github.com/OwnTube/owntube/issues">Issues</a>
</p>

---

OwnTube serves a pinned build of the official YouTube web client and answers its requests with its own backend. Accounts, channels, video metadata, and playback data come from the instance's PostgreSQL database; video streams and thumbnails come from its media storage.

The existing YouTube interface and player provide the browsing and watching experience. The official YouTube Studio client is also pinned and served on a separate origin for creator pages and uploads. Compatibility work happens primarily on the server, with small client patches where required for routing, bootstrap configuration, and local operation.

**OwnTube is in early alpha.** Browsing, local accounts, playback, comments, playlists, and creator support are being implemented against the real clients. Studio's editing/publishing workflow and the custom operator dashboard are unfinished; this is not feature parity with YouTube.

<p align="center">
  <img src="evidence/playback/01-playing.png" width="960" alt="Committed playback evidence: the official YouTube watch interface displaying an OwnTube test video" />
</p>
<p align="center"><sub>Watch-page playback evidence included in this repository.</sub></p>

## Current status

The table below describes the committed source, not a guarantee that every control in the official clients is supported. Responses for many pages and dialogs are built from captured YouTube response templates populated with local records.

| Area | Current scope |
| --- | --- |
| Watch and playback | Local stream/player responses, related videos, playlist panels, signed media URLs, byte ranges, and UMP delivery |
| Accounts | Local registration, sign-in, sessions, and channel records; these are OwnTube accounts, not Google accounts |
| Client and media | `src/client/` and `src/media/` are published, along with the pinned client archives and sample media |
| Home and channels | Home feed, channel home/videos/playlists tabs, and channel About panels |
| Search | Video, channel, and playlist results, supported sort/filter controls, continuations, and suggestions |
| Library and history | You page, watch history/resume positions, Watch later, Liked videos, and playlist feeds |
| Comments | Threads, replies, sorting, posting, comment likes, and deleting your own comments; GIFs in comments and replies when the host sets a KLIPY key |
| Playlists | Creation, editing, deletion, save-to-playlist sheets, and saving other users' accessible playlists to the library |
| Reactions and subscriptions | Persisted video likes/dislikes and subscriptions, subscription feeds, and channel lists |
| Sharing | Share panels with instance-local video, playlist, and channel links; embedding is omitted |
| YouTube Studio | Official client on a separate origin, owner-scoped channel/video listing, resumable uploads with processing progress, metadata editing, publishing, and single/bulk deletion |
| Operator admin | Overview, accounts (disable, operator role, sign-out), videos (reprocess, remove), processing jobs, client compatibility, sign-up setting, and an audit log; light/dark/device appearance shared with the client |

The playback screenshots in [`evidence/playback/`](evidence/playback/) record the initial playback milestone. They do not verify every newer page or Studio workflow. The repository also includes a browser playback script for pause, resume, seeking, reload, and quality selection.

The main client is pinned in [`pin/client.json`](pin/client.json), and Studio in [`pin/studio.json`](pin/studio.json). The manifests record build versions, asset checksums, and lazy modules. Build updates are explicit.

### Known limitations

- Studio covers uploading, processing progress, metadata editing, publishing, and deletion. Other Studio pages, such as analytics and comment moderation, are not backed by data. No copyright or Community Guidelines checks run, so Studio shows its default "Checks complete" state.
- Custom thumbnail and additional audio-track upload URLs are configured in Studio, but their upload handlers are not implemented.
- Shorts URLs open the ordinary watch page; there is no dedicated Shorts browsing experience. Live streaming and monetization are not implemented.
- Notifications currently have an empty inbox/count. The bell-preference handler acknowledges requests without persisting a preference or delivering notifications.
- Unsupported InnerTube methods are recorded in diagnostics and may return an empty response envelope. A successful HTTP response alone does not establish a working feature.

## Self-hosting

You need:

- A recent [Bun](https://bun.sh/) release with its built-in PostgreSQL `SQL` API and support for the bundled lockfile.
- A running [PostgreSQL](https://www.postgresql.org/) server and an empty database.
- [FFmpeg and FFprobe](https://ffmpeg.org/) on your `PATH`, with H.264/AAC and VP9/Opus encoding support (`libx264`, `aac`, `libvpx-vp9`, and `libopus`).
- Enough disk space for the client archives, source uploads, thumbnails, and multiple encoded versions of each video.
- Internet access when acquiring or repairing client assets. Normal client serving uses the local archives.

### Local setup

Clone the project and install dependencies:

```sh
git clone https://github.com/OwnTube/owntube.git
cd owntube
bun install
```

Create a PostgreSQL database using your local PostgreSQL account:

```sh
createdb owntube
```

Set the connection string for that account, replacing the placeholders:

```sh
export DATABASE_URL='postgres://YOUR_POSTGRES_USER:YOUR_POSTGRES_PASSWORD@localhost:5432/owntube'
export PUBLIC_ORIGIN='http://localhost:8080'
```

Verify the committed client archives and patch matches, generate demo records and videos, and start the server:

```sh
bun scripts/fetch-client.ts --check
bun scripts/fetch-studio.ts --check
bun run check-patches
SEED_PASSWORD='choose-a-local-test-password' bun run seed
bun run start
```

Open `http://localhost:8080/` for the home feed. The seed command also prints video IDs for direct `/watch?v=VIDEO_ID` links. Local sign-in and registration are at `/signin` and `/register`. Opening `/upload` while signed in leads to Studio's upload dialog; Studio defaults to `http://localhost:8081/`.

Migrations run when the application or seed command starts. The demo accounts are `alice` and `bob`; they use the `SEED_PASSWORD` supplied to the seed command when first created.

The seed command creates database records and processes generated test videos. Committed media files alone do not populate a new database. The first account registered in an empty database becomes an operator; if seeding creates the first accounts, that is `alice`. `/admin` requires an operator account.

The committed Studio snapshot omits some promotional artwork. Its archive checker currently reports those missing files; the main client archive and patch checks can still pass. Keep Studio verification output when diagnosing missing images or incomplete creator pages.

If archive verification reports missing files, repair from the existing pins and rerun the checks:

```sh
bun run fetch-client
bun scripts/fetch-studio.ts
```

These repair commands do not deliberately select a newer client build. If upstream no longer serves the pinned files, an explicit re-pin and compatibility check may be needed.

### YouTube Studio

Studio uses the actual pinned creator client, separate from the custom operator admin page. The server listens on `STUDIO_PORT` and selects Studio requests by the host in `STUDIO_ORIGIN`.

- On localhost, the default origins are `http://localhost:8080` and `http://localhost:8081`. Use the same hostname for both; browser cookies are shared across ports.
- For a hosted instance, configure `PUBLIC_ORIGIN` and `STUDIO_ORIGIN` explicitly, for example `https://video.example.com` and `https://studio.example.com`. Set `COOKIE_DOMAIN=example.com` so both hosts receive the session cookies.
- Route both hostnames to OwnTube through your reverse proxy, preserving the external Host header. The application can distinguish the hosts on either listening port.
- Studio requires a signed-in local account and restricts creator data to that account's channel. Other creator pages beyond content management are not implemented.

To pin a new Studio build, use `bun scripts/fetch-studio.ts --page /absolute/path/to/captured-studio-page.html`. The fetcher sanitizes the supplied signed-in page before archiving it. Raw captures remain outside the committed source.

### Configuration

Bun loads a project-root `.env` file automatically. Environment variables can also be exported in your shell.

| Variable | Default | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | `postgres://owntube:owntube@localhost:5432/owntube` | PostgreSQL connection |
| `PORT` | `8080` | HTTP listen port |
| `PUBLIC_ORIGIN` | `http://localhost:$PORT` | Public origin used in generated URLs and authentication |
| `STUDIO_PORT` | `PORT + 1` | Second HTTP listen port for Studio |
| `STUDIO_ORIGIN` | Localhost: same scheme/hostname with `STUDIO_PORT`; otherwise `studio.<public-host>` | External origin for the pinned Studio client |
| `COOKIE_DOMAIN` | Unset | Parent cookie domain when the main client and Studio use different hostnames |
| `INSTANCE_NAME` | `OwnTube` | Instance name |
| `MEDIA_DIR` | `data/media` | Local media directory |
| `MAX_UPLOAD_BYTES` | `2147483648` | Maximum request body and resumable upload size in bytes |
| `UPSTREAM_ASSET_FETCH` | Off | Set to `1` to enable the development fallback for missing client assets |
| `NO_WORKER` | Unset | Set to `1` to skip starting the processing worker |
| `LOG_REQUESTS` | Unset | Set to `1` to log requests |
| `KLIPY_API_KEY` | Unset | Turns on GIFs in comments, searched through [KLIPY](https://klipy.com) with this key; without it there is no GIF button |
| `KLIPY_CONTENT_FILTER` | `high` | KLIPY's content filter for GIF searches (`off`, `low`, `medium`, `high`) |

With `KLIPY_API_KEY` set, signed-in viewers get a GIF button next to the comment box's emoji button. Searches go through the instance, so the key stays on the server and viewers never contact KLIPY: a GIF is fetched from KLIPY's CDN once and served from `MEDIA_DIR/gifs`. Viewers can star GIFs to keep them under the picker's ★ button. The client shows a posted GIF with its own comment image attachment.

Normal asset serving uses the local archives. The development upstream fallback is off by default. The original client archives are tracked. Media in `data/media/` is generated by seeding and uploads and is ignored, as are derived `client/patched/` output, credentials, and raw HAR captures.

## Admin panel

`/admin` is available to operator accounts only; other visitors get a 404. It has:

- **Overview**: counts, latest uploads, processing, newest accounts, client pins, unhandled requests, and recent operator activity.
- **Accounts**: search and filter; disable or enable an account (disabling signs it out everywhere), grant or remove the operator role, and sign an account out.
- **Account page**: an account's details, latest videos and actions, and its **marks**, shown on the site with YouTube's own graphics: a verification badge (the Verified checkmark or the Official Artist Channel note, on the watch page, lockups, search, the channel header and comments) and the YouTube Premium logo in the account's masthead.
- **Videos**: search and filter by state; process a video again from its source or remove it with its media.
- **Processing**: jobs by state, with retry for failed jobs.
- **Compatibility**: pinned client and Studio builds, patch checks, and InnerTube methods the instance does not handle yet (downloadable as JSON).
- **Settings**: open or close sign-ups.
- **Audit log**: every operator action.

Actions are same-origin form posts with a per-session token. The account menu's Appearance choice is the same setting as the main client's Appearance menu. The earlier mockup in [docs/admin-panel/](docs/admin-panel/README.md) is superseded.

## Development

Use the official client to verify compatibility. An endpoint returning successfully is only part of a working page: navigation, player behavior, and persisted state need browser checks too.

| Command | Purpose |
| --- | --- |
| `bun scripts/fetch-client.ts --check` | Check the local archive against the pin without downloading |
| `bun scripts/fetch-studio.ts --check` | Check the Studio archive against its pin without downloading |
| `bun run check-patches` | Check expected client/player/Studio patch match counts |
| `bun scripts/fetch-client.ts --update` | Explicitly acquire and pin a newer client build |
| `bun run typecheck` | Run the TypeScript checker |
| `bun scripts/seed.ts --reprocess` | Reprocess the seeded videos |
| `bun scripts/probe.ts '/watch?v=VIDEO_ID' --play --shot watch.png` | Inspect the watch page and save a screenshot |
| `bun scripts/e2e/playback.ts VIDEO_ID --shots evidence/playback` | Exercise the official player and capture screenshots |
| `bun scripts/e2e/core.ts --shots evidence/core` | Run the core flows (search, watch, like, subscribe, comment, Watch later, history, appearance, Studio, admin access) as the seeded `bob`, undoing every change |

The browser tools use `playwright-core` and require a compatible Chromium installation. Set `CHROME_PATH` to its executable path; see [`scripts/probe.ts`](scripts/probe.ts) for the launch configuration.

Documentation:

- [Architecture and reverse-engineering notes](docs/architecture.md)
- [Endpoint map](docs/compat/endpoints.md)
- [Patch inventory](docs/client-patches.md)
- [Parity checklist](docs/compat/parity.md)
- [Remaining work](docs/remaining-work.md)

Useful starting points:

- [`src/server.ts`](src/server.ts): request routing and application startup.
- [`src/innertube/`](src/innertube/): API handlers and YouTube-compatible response structures.
- [`src/instance.ts`](src/instance.ts): local authentication and instance routes.
- [`src/studio/`](src/studio/): the pinned Studio shell, creator APIs, and resumable upload handling.
- [`src/client/`](src/client/): archived asset serving, bootstrap configuration, and compatibility patches.
- [`src/media/`](src/media/): FFmpeg processing, stream formats, byte ranges, and UMP delivery.
- [`src/admin/`](src/admin/): the operator admin panel.
- [`migrations/`](migrations/): database schema.
- [`scripts/research/`](scripts/research/): browser capture and investigation tools.
- [`scripts/e2e/playback.ts`](scripts/e2e/playback.ts): playback verification.
- [`scripts/e2e/gifs.ts`](scripts/e2e/gifs.ts): GIF comments (needs `KLIPY_API_KEY`).

When reporting a bug, include the pinned build, affected route, reproduction steps, and relevant console or server errors. Sanitize captures before sharing them.

## Credits

The architecture is inspired by [Meowcord](https://github.com/meowcorded/meowcord/) and [Xitter](https://github.com/Xittered/xitter): serve the actual client and implement a compatible backend.

Useful protocol research references include [YouTube.js](https://github.com/LuanRT/YouTube.js), [yt-dlp](https://github.com/yt-dlp/yt-dlp), and [Invidious](https://github.com/iv-org/invidious).

---

<p align="center"><sub>Actual client. Independent backend. OwnTube.</sub></p>
