# Remaining work

The goal is every page, setting and creator workflow of the official clients working against this instance. This list is ordered roughly by priority within each section; [compat/parity.md](compat/parity.md) has what already works. Each item needs real captures of the pinned build (read-only, with a test account), templates from them, persisted state, and a browser check.

## Admin panel

- More YouTube-native marks an operator can grant: channel membership badges in comments, creator awards on the channel page.
- Verification badges on playlist headers and the Subscriptions channel list.
- Per-account limits (upload size, daily uploads), strikes and channel suspension with the client's own terminated-channel page.
- Video moderation: age restriction, hide from search, takedown with the client's unavailable-video message.
- Comment moderation across the instance; reports queue once reporting exists.

## Main client pages

- Shorts: the Shorts player (`/shorts/<id>`) and the Shorts shelf and tab.
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

Every settings page in the client, backed by stored preferences:

- Account: channel name and handle, profile picture, banner (with Studio's Customization).
- Notifications: subscriptions, recommended, activity, replies, mentions, email.
- Playback and performance: captions always on, auto-generated captions, AV1 preference, ambient mode, inline playback.
- Privacy: keep subscriptions private, keep saved playlists private, history pause.
- Connected apps, Billing and payments, Advanced settings (channel id, move channel, delete channel).
- Downloads quality.
- Language, Location and Restricted mode from the account menu.

## YouTube Studio

- Dashboard comments and recent subscribers cards.
- Content tabs: Shorts, Live, Posts, Playlists (create/edit in Studio), Podcasts; filters and search; views in the list.
- Video details: custom thumbnail upload, playlists, audience (made for kids), age restriction, tags, category, language, recording date/location, license, embedding, comments and ratings settings, scheduling.
- Video editor (trim, blur, audio), end screens, cards, subtitles editor.
- Analytics from recorded views and watch time (overview, content, audience, real-time).
- Community: comments moderation (held for review, likes, hearts, replies, pin), mentions, posts.
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
