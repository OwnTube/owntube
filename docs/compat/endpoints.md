# Endpoint map

What the pinned clients request and what this instance answers. Response shapes come from captured YouTube responses (see [architecture.md](../architecture.md#innertube-responses)); "mutation" means the method requires a signed-in viewer and a valid `SAPISIDHASH` signature.

Anything not listed here gets an empty `{responseContext}` envelope and appears under **Unhandled requests** in the admin panel's Compatibility page.

## Page URLs (main client)

| URL | Page | Data |
| --- | --- | --- |
| `/` | Home | `FEwhat_to_watch`: recent public videos, infinite scroll |
| `/watch?v=&list=&index=&t=` | Watch | `next` + `player` for the video; playlist panel when `list` is set; records history for signed-in viewers |
| `/shorts/<id>` | Shorts | `reel/reel_item_watch` data, `player`, and the following Shorts in `ytInitialReelWatchSequenceResponse`; a video that isn't a Short redirects to `/watch?v=<id>` |
| `/shorts/` | Shorts | The newest Short with `replacementEndpoint` and `sequenceContinuation` (the client moves to `/shorts/<id>` and asks for the sequence) |
| `/results?search_query=&sp=` | Search | `search` |
| `/@handle`, `/channel/UC…` and `/featured`, `/videos`, `/playlists` | Channel | Channel browse with tabs |
| `/playlist?list=` | Playlist | `VL<list>` browse |
| `/feed/subscriptions` | Subscriptions | `FEsubscriptions` |
| `/feed/history` | History | `FEhistory` |
| `/feed/you`, `/feed/library` | You | `FElibrary` |
| `/feed/playlists` | Playlists | `FEplaylist_aggregation` (signed in) |
| `/feed/channels` | All subscriptions | `FEchannels` (signed in) |
| `/upload` | — | Redirects to Studio's upload dialog |
| `/account`, `/account_notifications`, `/account_playback`, `/account_privacy`, `/account_sharing`, `/account_billing`, `/account_advanced`, `/account_downloads`, `/account_time_management` | Settings | `SPaccount_*` (signed in; signed out goes to sign-in) |

## InnerTube methods (`/youtubei/v1/…`, main client)

| Method | Handler | Notes |
| --- | --- | --- |
| `browse` | [`browse.ts`](../../src/innertube/browse.ts) | Browse ids above, `VL…` playlists, `UC…` channels, `SPaccount_*` settings pages ([`settings.ts`](../../src/innertube/settings.ts); 401 `unauthorized` when signed out), `FEnotifications_inbox` (empty). Continuations for home, subscriptions, history, playlists/channels feeds, channel videos, About panel, playlist items, and the Shorts comments panel. |
| `reel/reel_item_watch` | [`shorts.ts`](../../src/innertube/shorts.ts) | One Short (`playerRequest.videoId`): overlay, like/subscribe/share, comments and description panels, element templates. Seedless (guide): the newest Short with `replacementEndpoint`. Records history. |
| `reel/reel_watch_sequence` | `shorts.ts` | `sequenceParams` (our token): the next 10 Shorts, newest first, and a continuation. |
| `navigation/resolve_url` | `browse.ts` | Resolves `/@handle`, channel and feed URLs to browse endpoints. |
| `next` | [`watch-routes.ts`](../../src/innertube/watch-routes.ts) | Watch page data: metadata, owner, actions, related videos, playlist panel. Continuations for related videos, comments and replies. |
| `player` | `watch-routes.ts` | `playabilityStatus`, `videoDetails`, `streamingData` pointing at `/videoplayback`, no captions. |
| `get_watch` | `watch-routes.ts` | Combined `next` + `player` used by some in-page navigations. |
| `search` | [`search.ts`](../../src/innertube/search.ts) | Videos, channels and playlists; sort and type/duration/upload-date filters from `sp`; continuations. |
| `guide` | [`guide.ts`](../../src/innertube/guide.ts) | Side guide with the viewer's subscriptions and playlists. |
| `account/account_menu` | `guide.ts` | Avatar menu from the captured template, Google's entries pointing at local pages, with an Admin link for operators. On the Studio host, Studio's own menu (`account/studio_menu`). |
| `account/set_setting` | `settings.ts` | Mutation. `{settingItemId, newValue: {boolValue \| intValue \| stringValue}}` for the ids the settings pages carry; stored in `account_settings`. |
| `get_panel` | [`panels.ts`](../../src/innertube/panels.ts) | `PAadd_to_playlist` (the Save sheet, `playlists.ts`), `PApreferred_language_settings` (`settings.ts`). |
| `submit_form` | `panels.ts` | Mutation. `SUBMIT_ID_PREFERRED_LANGUAGE_SETTINGS_FORM`. |
| `notification/get_unseen_count` | `guide.ts` | Always 0. |
| `notification/modify_channel_preference` | [`actions.ts`](../../src/innertube/actions.ts) | Acknowledged with a toast; not persisted. |
| `like/like`, `like/dislike`, `like/removelike` | `actions.ts` | Mutation. Video ratings; for a playlist target, saves or removes it from the library. |
| `subscription/subscribe`, `subscription/unsubscribe` | `actions.ts` | Mutation. |
| `share/get_share_panel` | `actions.ts` | Instance-local links; no embed tab. |
| `history/clear_watch_history` | `actions.ts` | Mutation. |
| `feedback` | [`history.ts`](../../src/innertube/history.ts) | Removing one entry or clearing watch history (signed tokens issued by this instance); other feedback tokens are accepted and ignored. |
| `comment/create_comment`, `comment/create_comment_reply`, `comment/perform_comment_action` | [`comments.ts`](../../src/innertube/comments.ts) | Mutation. Posting, replying, liking and unliking, and deleting your own comments. Accepts `yewtubeGif` (a GIF token from `/_ot/gifs/search`). |
| `playlist/create`, `browse/edit_playlist`, `playlist/delete` | [`playlists.ts`](../../src/innertube/playlists.ts) | Mutation. Create, add/remove/move videos, rename, privacy, description, delete. |
| `att/get` | [`router.ts`](../../src/innertube/router.ts) | A challenge without a BotGuard program. |
| `log_event`, `att/log`, `visitor_id`, `stats/qoe`, `stats/watchtime` | `router.ts` | Accepted and dropped. |

## InnerTube methods (Studio host)

| Method | Handler | Notes |
| --- | --- | --- |
| `creator/get_creator_channels` | [`studio/api.ts`](../../src/studio/api.ts) | The viewer's channel only. |
| `creator/list_creator_videos` | `studio/api.ts` | Content list with filters, sort and paging. |
| `creator/get_creator_videos` | `studio/api.ts` | Video details for the edit page and upload dialog. Owner permissions include `CREATOR_VIDEO_PERMISSION_WATCH`. |
| `creator/list_creator_playlists` | `studio/api.ts` | The channel's playlists. |
| `creator/get_creator_communications` | `studio/api.ts` | Empty. |
| `creator/get_creator_google_hats_trigger_ids`, `get_survey`, `att/esr` | `studio/api.ts` | Empty, as YouTube answers with no survey to show. |
| `creator/get_channel_dashboard` | [`studio/dashboard.ts`](../../src/studio/dashboard.ts) | The dashboard cards: channel facts from analytics queries, the latest video snapshot, recent uploads, the latest comments the channel hasn't answered (with their comment and author entities), and YouTube's news cards from the capture. |
| `yta_web/get_screen` | [`studio/screens.ts`](../../src/studio/screens.ts) | An analytics tab: the captured layout (a Shorts section added to Content when the channel has Shorts) and the tab's cards. Only the channel's owner (403 otherwise, 401 signed out). |
| `yta_web/get_cards` | `studio/screens.ts` | Cards by config, for the requested period. Headline, key metrics, top content, realtime and video tables come from [`studio/analytics.ts`](../../src/studio/analytics.ts); the videos a card lists are sent along as `sideEntities.videos` ({mask, entityData}); other cards get the captured no-data bodies with their dates moved to today. |
| `comment/get_comments` | [`studio/comments.ts`](../../src/studio/comments.ts) | Studio route. The channel's (`channelId`) or one of its videos' (`videoId`) comments: Published or Held (`moderationState`), Studio's filters (`commentsFilter` / `commentsFilterForHeldForReviewTab`: response status, questions, content type, sort; `searchQuery`), up to `maxReplies` replies per thread, 20 threads a page (`continuation` → `itemSectionContinuation`). 403 for another channel, 401 signed out. |
| `comment/get_comment_replies` | `studio/comments.ts` | Studio route. More replies (`commentRepliesContinuation`). |
| `comment/create_comment_reply`, `comment/update_comment`, `comment/update_comment_reply` | `studio/comments.ts` | Studio routes, mutation. The channel's reply, and edits of its own comments (`commentText` / `replyText`). |
| `comment/perform_comment_action` | `studio/comments.ts` | Studio route, mutation. Tokens for like, unlike, heart, unheart, remove, report as spam and approve; several at once from the batch bar. Answers `removeCommentAction` / `approveCommentAction` so the list drops the comment. |
| `promotions/get_account` | `studio/api.ts` | Account currency, time zone and country for the promotions UI. |
| `creator/check_creator_bulk_action` | `studio/api.ts` | Always done: only bulk delete exists. |
| `notification/get_unseen_count` | `studio/api.ts` | Always 0. |
| `upload/createvideo` | `studio/api.ts` | Mutation. Creates the video (private draft) for an upload's resource id; processing starts once the transfer completes. |
| `video_manager/metadata_update` | `studio/api.ts` | Mutation. Title, description, visibility, draft state; sets the publish time when a video is first made non-private. |
| `upload/feedback` | [`studio/feedback.ts`](../../src/studio/feedback.ts) | Upload and processing progress for the upload dialog and content list. |
| `video/delete` | `studio/api.ts` | Mutation. Answers `{success}`. |
| `creator/enqueue_creator_bulk_delete`, `creator/check_creator_bulk_delete` | `studio/api.ts` | Mutation / status. |

## Other HTTP endpoints

| Path | Host | Purpose |
| --- | --- | --- |
| `/s/…`, `/_up/<host>/…` | both | Archived client assets, patched at serve time |
| `/videoplayback?id&itag&range[&ump=1]` | main | Media bytes |
| `/vi/<id>/<name>.jpg`, `/vi_webp/…` | main | Thumbnails; private ones only for the owner and operators. `frame0` is the full frame at the video's aspect (the Shorts poster; hqdefault for videos processed before it existed) |
| `/ggpht/UC…/avatar`, `/ggpht/UC…/banner` | main | Channel images |
| `/complete/search` | main | Search suggestions |
| `/api/stats/playback`, `/api/stats/watchtime` | main | Watch history and resume position |
| `/generate_204`, `/csi_204`, `/ptracking`, `/pagead/*`, `/api/stats/qoe`, … | main | Beacons, answered 204 |
| `/error_204`, `/_csp` | main | Client errors and CSP reports, recorded in diagnostics |
| `/getDatasyncIdsEndpoint` | main | The signed-in account's datasync id |
| `/sw.js` | main | A worker that unregisters itself |
| `/signin`, `/register`, `/logout` | main | Local accounts. `/signin?add=1` signs another account in alongside; `/signin?action_handle_signin=true&authuser=N&next=` makes the Nth account on the browser active. `/logout` signs every account on the browser out (GET from this origin or Studio's). |
| `/getAccountSwitcherEndpoint` | both | Switch account list (`)]}'` + JSON) for the accounts signed in on the browser; links lead back to the page it was opened on |
| `/myaccount` | main | The local account: info, password, sessions, data, account deletion ([`myaccount.ts`](../../src/myaccount.ts)) |
| `/feedback` | main | Send feedback, read by operators on the admin panel ([`feedback.ts`](../../src/feedback.ts)) |
| `/_ot/help.js` | both | Stand-in for Google's help and feedback service ([`assets/help.js`](../../assets/help.js)) |
| `/admin/…` | main | Operator admin panel |
| `/_ot/gifs.js`, `/_ot/gifs/search?q=&page=`, `/_ot/gifs/favorites` (GET, POST JSON), `/_ot/gifs/media/<id>/<sm\|md>.webp` | main | GIFs in comments, only with `KLIPY_API_KEY` ([`gifs.ts`](../../src/gifs.ts)); search and favorites need a signed-in viewer |
| `/upload/studio` and the session URLs it returns | Studio | Resumable uploads (Scotty protocol) |
| `/ytscframe` | Studio | The empty document Studio's attestation code loads in a hidden iframe, as YouTube serves it |
| `/channel/UC…/…` | Studio | Studio pages for the signed-in channel |
