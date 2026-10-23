# Remaining work

The goal is every page, setting and creator workflow of the official clients working against this instance. This list is ordered roughly by priority within each section; [compat/parity.md](compat/parity.md) has what already works. Each item needs real captures of the pinned build (read-only, with a test account), templates from them, persisted state, and a browser check.

## Admin panel

- More YouTube-native marks an operator can grant: channel membership badges in comments, creator awards on the channel page.
- Verification badges on playlist headers and the Subscriptions channel list.
- Per-account limits (upload size, daily uploads), strikes and channel suspension with the client's own terminated-channel page.
- Video moderation: age restriction, hide from search, takedown with the client's unavailable-video message.
- Comment moderation across the instance; reports queue once reporting exists.

## Main client pages

- Guide destinations, hidden from the guide until each is served (`UNSERVED` in `src/innertube/guide.ts`): YouTube's Music and Live channels, Gaming, Podcasts, Playables, Your memberships (`/channel_memberships`), Report history, Downloads. Every one is captured signed in and signed out (`captures/site-in`, `site-out`).
- Shorts: the Shorts shelf on Home, the channel Shorts tab and Studio's Content > Shorts list. The player itself is served (`/shorts/`, `/shorts/<id>`); Remix and the sound page are not.
- Signed-out `/playlist?list=WL` and `LL` answer 404; YouTube shows the page with a sign-in alert.
- Channel tabs: Shorts, Live, Posts (community posts with polls and images), channel search, Store; channel trailer and featured sections on Home.
- Home chips and personalised ordering; "Not interested" and "Don't recommend channel" feedback.
- Explore pages: Trending, Music, Gaming, News, Sports, Courses, Fashion, Podcasts; Movies; Premium and YouTube Kids entry points (shown as unavailable).
- Notifications: generated on uploads from subscriptions, comment replies and likes; the bell preferences persisted.
- Captions (upload in Studio, `timedtext`), chapters from descriptions, storyboards for seek previews, end screens and cards.
- Clips, Download (offline), Thanks, Report, "Add to queue".
- The comment box's emoji picker (the client's own, fed with its emoji data).
- Live streaming (RTMP ingest, live chat) and premieres.
- `/embed/<id>` with the embedded player.
- Hashtag pages (`/hashtag/<tag>`), `/feed/trending`, `/feed/storefront`.
- Playlist extras: collaborators, sort options, "Save" counts.

## Settings (`/account*`)

The settings pages are served natively and their switches persist ([compat/parity.md](compat/parity.md#main-client-settings-account)). What's left:

- Apply the stored choices: generate notifications according to the Notifications switches, and hide subscriptions on the channel page when "Keep all my subscriptions private" is on.
- Account: channel name, handle and profile picture are edited in Studio's Customization, which isn't served yet.
- Purchases and memberships (`/paid_memberships`): needs a capture of an account without purchases.
- Language and Location from the account menu: only English is pinned.
- Restricted Mode: nothing is filtered.

## YouTube Studio

- The Help button and Send feedback go through Google's help service; both now open local equivalents (a stand-in script). Check the rest of Studio's help entry points (help cards, "Learn more" links).

- Dashboard comments and recent subscribers cards.
- Content tabs: Posts (`post/list_creator_posts`), Inspiration (`creator/list_video_ideas`), the promotions illustration; then filters and search, views in the list, create/edit playlists. (The "Nn`" errors an earlier survey reported came from URLs that aren't in Studio's route table.)
- Methods the Studio survey found unhandled, by page: subtitles `crowdsourcing/get_video_translations`, `crowdsourcing/list_video_translations`, `creator/get_supported_content_languages`; copyright `copyright/list_complaint_videos`, `creator/list_creator_received_claims`; customization `channel_edit/get_channel_page_settings`; audio library `creator_music/list_tracks`; editor `video_editor/*`, `creator/list_creator_info_cards`, `creator/get_creator_endscreens`; video details `get_creator_social_suggestions`, `feature_eligibility/check_feature_rate_limit`.
- Video details: custom thumbnail upload, playlists, audience (made for kids), age restriction, tags, category, language, recording date/location, license, embedding, comments and ratings settings, scheduling.
- Video editor (trim, blur, audio), end screens, cards, subtitles editor.
- Analytics: a video's own analytics (needs a capture of its layout); the Content tab's section when opened directly; Advanced mode (explore) queries beyond the ones the cards make; impressions, traffic sources, returning viewers and demographics are not recorded.
- Community: pinning comments, holding comments for review automatically (Held lists only those the channel reported as spam), mentions, posts.
- Customization: profile, banner, watermark, layout (trailer, featured sections), handle.
- Audio library, Copyright, Content detection, Earn (shown as unavailable but navigable).
- Settings: upload defaults, permissions, community moderation words, channel basics.
- Bulk edit actions besides delete.

## Platform

- Docker Compose for Postgres and the app with both origins.
- Fetching the YouTube client per instance instead of committing the archive (as kittok does), with the pin still committed.
- Background job queue across processes; storage backends besides the local disk.
- Search index for larger catalogues.
- Rate limiting that trusts `X-Forwarded-For` only from a configured proxy.
- Federation or import tools are out of scope unless requested.
