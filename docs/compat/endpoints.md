# Endpoint map

What the pinned clients request and what this instance answers. Response shapes come from captured YouTube responses (see [architecture.md](../architecture.md#innertube-responses)); "mutation" means the method requires a signed-in viewer and a valid `SAPISIDHASH` signature.

Anything not listed here gets an empty `{responseContext}` envelope and appears under **Unhandled requests** in the admin panel's Compatibility page.

## Page URLs (main client)

| URL | Page | Data |
| --- | --- | --- |
| `/` | Home | `FEwhat_to_watch`: recent public videos, infinite scroll |
| `/watch?v=&list=&index=&t=` | Watch | `next` + `player` for the video; playlist panel when `list` is set; records history for signed-in viewers |
| `/shorts/<id>` | — | Redirects to `/watch?v=<id>` |
| `/results?search_query=&sp=` | Search | `search` |
| `/@handle`, `/channel/UC…` and `/featured`, `/videos`, `/playlists` | Channel | Channel browse with tabs |
| `/playlist?list=` | Playlist | `VL<list>` browse |
| `/feed/subscriptions` | Subscriptions | `FEsubscriptions` |
| `/feed/history` | History | `FEhistory` |
| `/feed/you`, `/feed/library` | You | `FElibrary` |
| `/feed/playlists` | Playlists | `FEplaylist_aggregation` (signed in) |
| `/feed/channels` | All subscriptions | `FEchannels` (signed in) |
| `/upload` | — | Redirects to Studio's upload dialog |

## InnerTube methods (`/youtubei/v1/…`, main client)

| Method | Handler | Notes |
| --- | --- | --- |
| `browse` | [`browse.ts`](../../src/innertube/browse.ts) | Browse ids above, `VL…` playlists, `UC…` channels, `SP…` settings (a "not available" message), `FEnotifications_inbox` (empty). Continuations for home, subscriptions, history, playlists/channels feeds, channel videos, About panel, playlist items. |
| `navigation/resolve_url` | `browse.ts` | Resolves `/@handle`, channel and feed URLs to browse endpoints. |
| `next` | [`watch-routes.ts`](../../src/innertube/watch-routes.ts) | Watch page data: metadata, owner, actions, related videos, playlist panel. Continuations for related videos, comments and replies. |
| `player` | `watch-routes.ts` | `playabilityStatus`, `videoDetails`, `streamingData` pointing at `/videoplayback`, no captions. |
| `get_watch` | `watch-routes.ts` | Combined `next` + `player` used by some in-page navigations. |
| `search` | [`search.ts`](../../src/innertube/search.ts) | Videos, channels and playlists; sort and type/duration/upload-date filters from `sp`; continuations. |
| `guide` | [`guide.ts`](../../src/innertube/guide.ts) | Side guide with the viewer's subscriptions and playlists. |
| `account/account_menu` | `guide.ts` | Avatar menu from the captured template, with an Admin link for operators. |
| `notification/get_unseen_count` | `guide.ts` | Always 0. |
| `notification/modify_channel_preference` | [`actions.ts`](../../src/innertube/actions.ts) | Acknowledged with a toast; not persisted. |
| `like/like`, `like/dislike`, `like/removelike` | `actions.ts` | Mutation. Video ratings; for a playlist target, saves or removes it from the library. |
| `subscription/subscribe`, `subscription/unsubscribe` | `actions.ts` | Mutation. |
| `share/get_share_panel` | `actions.ts` | Instance-local links; no embed tab. |
| `history/clear_watch_history` | `actions.ts` | Mutation. |
| `feedback` | [`history.ts`](../../src/innertube/history.ts) | Removing one entry or clearing watch history (signed tokens issued by this instance); other feedback tokens are accepted and ignored. |
| `comment/create_comment`, `comment/create_comment_reply`, `comment/perform_comment_action` | [`comments.ts`](../../src/innertube/comments.ts) | Mutation. Posting, replying, liking and unliking, and deleting your own comments. |
| `playlist/create`, `browse/edit_playlist`, `playlist/delete` | [`playlists.ts`](../../src/innertube/playlists.ts) | Mutation. Create, add/remove/move videos, rename, privacy, description, delete. |
| `get_panel` | `playlists.ts` | `PAadd_to_playlist` (the Save sheet). |
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
| `/vi/<id>/<name>.jpg`, `/vi_webp/…` | main | Thumbnails; private ones only for the owner and operators |
| `/ggpht/UC…/avatar`, `/ggpht/UC…/banner` | main | Channel images |
| `/complete/search` | main | Search suggestions |
| `/api/stats/playback`, `/api/stats/watchtime` | main | Watch history and resume position |
| `/generate_204`, `/csi_204`, `/ptracking`, `/pagead/*`, `/api/stats/qoe`, … | main | Beacons, answered 204 |
| `/error_204`, `/_csp` | main | Client errors and CSP reports, recorded in diagnostics |
| `/getDatasyncIdsEndpoint` | main | The signed-in account's datasync id |
| `/sw.js` | main | A worker that unregisters itself |
| `/signin`, `/register`, `/logout` | main | Local accounts |
| `/admin/…` | main | Operator admin panel |
| `/upload/studio` and the session URLs it returns | Studio | Resumable uploads (Scotty protocol) |
| `/channel/UC…/…` | Studio | Studio pages for the signed-in channel |
