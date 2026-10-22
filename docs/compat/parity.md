# Parity checklist

What works in the official clients on this instance, compared with youtube.com. **Verified** means checked in a browser against the pinned client: by [`scripts/e2e/core.ts`](../../scripts/e2e/core.ts) (**e2e**), [`scripts/e2e/playback.ts`](../../scripts/e2e/playback.ts) (**playback**), or by hand during development (**manual**). Screenshots from the e2e runs are in [`evidence/core/`](../../evidence/core/) and [`evidence/playback/`](../../evidence/playback/).

Status: ✅ works · 🟡 partial · ❌ not implemented

## Main client

| Area | Feature | Status | Verified |
| --- | --- | --- | --- |
| Home | Feed of public videos, infinite scroll | ✅ | e2e |
| Home | Chips (topic filters), Shorts shelf, personalised ranking | ❌ | — |
| Search | Masthead search, results, suggestions | ✅ | e2e |
| Search | Sort and filters (type, duration, upload date) | ✅ | manual |
| Search | Channel and playlist results | ✅ | manual |
| Watch | Official player: autoplay, pause, seek, quality, reload | ✅ | playback |
| Watch | In-page navigation from results and related videos | ✅ | e2e |
| Watch | Description, counts, dates, owner, related videos | ✅ | e2e |
| Watch | Like / dislike, persisted and shown after reload | ✅ | e2e |
| Watch | Subscribe / unsubscribe, persisted | ✅ | e2e |
| Watch | Comments: post, reply, like, sort, delete own | ✅ | e2e (post, delete), manual (rest) |
| Watch | GIFs in comments and replies: picker, search, favorites, shown by the client's own attachment view | ✅ | e2e (`gifs.ts`) |
| Watch | Emoji picker in the comment box | ❌ | — |
| Watch | Save to playlist sheet, Watch later, new playlist | ✅ | e2e (Watch later), manual |
| Watch | Share panel with instance links | ✅ | manual |
| Watch | Playlist panel, play all, autoplay next | ✅ | manual |
| Watch | Captions, chapters, storyboards (seek previews), end-screen cards | ❌ | — |
| Watch | Live chat, Super Chat, clips, Download, Thanks, Report | ❌ | — |
| Channel | Home, Videos, Playlists tabs; About panel | ✅ | e2e (open), manual |
| Channel | Shorts, Live, Posts, Store, channel search tab | ❌ | — |
| Channel | Banner, avatar, handle, subscriber count | ✅ | manual |
| Channel | Verified and Official Artist Channel badges (set by operators) | ✅ | manual |
| You | You page, History (remove an entry, clear all), Watch later, Liked videos | ✅ | e2e (history), manual |
| You | Playlists feed, All subscriptions | ✅ | manual |
| Subscriptions | Feed and channel list | ✅ | manual |
| Playlists | Create, rename, describe, privacy, reorder, remove, delete, save others' | ✅ | manual |
| Account | Local sign-in and sign-up (Google-style pages, no Google passwords) | ✅ | e2e (sign-in), manual |
| Account | Appearance: Dark, Light, device, persisted before first paint | ✅ | e2e |
| Account | Account switcher, Language, Location, Restricted mode | ❌ | menu entries without backing |
| Settings | `/account*` settings pages (notifications, playback, privacy, connected apps, advanced) | ❌ | "not available" message |
| Notifications | Bell, inbox, notification preferences | 🟡 | empty inbox; preference not stored |
| Shorts | Shorts player and feed | ❌ | `/shorts/<id>` opens the watch page |
| Other pages | Trending/Explore, Music, Gaming, News, Courses, Premium, Movies | ❌ | — |
| Embeds | `/embed/<id>` | ❌ | — |

## YouTube Studio

| Area | Feature | Status | Verified |
| --- | --- | --- | --- |
| Shell | Official Studio on its own origin, signed-in channel only | ✅ | e2e |
| Upload | Resumable upload, details, visibility, publish | ✅ | manual |
| Upload | Processing progress (transfer, SD/HD/4K) | ✅ | manual |
| Content | Videos list, sort, paging | ✅ | e2e |
| Content | Views column | 🟡 | shows "–" |
| Content | Filters, Shorts/Live/Posts/Playlists/Podcasts tabs | 🟡 | Playlists listed; other tabs empty |
| Content | Delete one or many | ✅ | manual |
| Edit | Title, description, visibility | ✅ | manual |
| Edit | Custom thumbnail, playlists, audience, tags, category, language, license, comments settings | ❌ | — |
| Edit | Editor (trim, blur), subtitles, end screens, cards | ❌ | — |
| Dashboard | Channel analytics, latest video performance, real-time views and top content, published videos, Creator Insider, What's new | ✅ | studio-walk screenshot |
| Dashboard | Latest comments, recent subscribers | ❌ | — |
| Analytics, Community, Subtitles, Copyright, Earn, Customization, Audio library, Settings | | ❌ | pages load without data |
| Appearance | Dark theme | ❌ | Studio's dark build isn't pinned, so a dark page shows light backgrounds |
| Checks | Copyright and guidelines checks | ❌ | Studio shows "Checks complete" |

## Admin panel

| Feature | Status | Verified |
| --- | --- | --- |
| Operator-only access (404 for everyone else), signed-out redirect | ✅ | e2e (404), manual |
| Overview, Accounts, Videos, Processing, Compatibility, Settings, Audit log | ✅ | manual (25 functional checks) |
| Light / Dark / device appearance shared with the client | ✅ | manual |
| Phone layout | ✅ | manual |
| Account marks: verification badge, Premium logo | ✅ | manual |
