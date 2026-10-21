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
  <a href="#development">Development</a> &nbsp;·&nbsp;
  <a href="https://github.com/OwnTube/owntube/issues">Issues</a>
</p>

---

OwnTube serves a pinned build of the official YouTube web client and answers its requests with its own backend. Accounts, channels, video metadata, and playback data come from the instance's PostgreSQL database; video streams and thumbnails come from its media storage.

The existing YouTube interface and player provide the browsing and watching experience. Compatibility work happens primarily on the server, with small client patches where required for routing, bootstrap configuration, and local operation.

**OwnTube is in very early alpha.** The current milestone focuses on the watch page and local video playback. It is a development project, and the wider browsing experience is still being built.

<p align="center">
  <img src="evidence/playback/01-playing.png" width="960" alt="Committed playback evidence: the official YouTube watch interface displaying an OwnTube test video" />
</p>
<p align="center"><sub>Watch-page playback evidence included in this repository.</sub></p>

## Current status

The committed implementation includes:

- A client acquisition tool and version manifest, with asset checksums and lazy-module discovery.
- Watch-page API handlers for `player`, `next`, and `get_watch`.
- Player responses describing locally stored video streams and thumbnails.
- Local account registration, sign-in, sessions, and channel records.
- PostgreSQL migrations and reproducible FFmpeg-generated demo videos.
- Compatibility diagnostics, browser probes, and a playback test covering pause, resume, seeking, reload, and quality selection.

The playback screenshots are in [`evidence/playback/`](evidence/playback/). They record the initial milestone; they do not establish feature parity across the rest of the site.

| Area | Current scope |
| --- | --- |
| Watch page | Main implemented compatibility milestone |
| Accounts | Local registration and sign-in implementation |
| Client serving and media processing | Referenced by the application; source directories still need publishing |
| Home, search, and channel browsing | Pending; browse and search handlers are placeholders |
| Comments and playlists | Placeholder handlers |
| Likes and subscriptions | Database schema exists; API mutations are not implemented |
| Upload and admin interfaces | Placeholder handlers |

The pin in [`pin/client.json`](pin/client.json) records desktop build `youtube.desktop.web_20261020_05_RC00`, 310 assets, and 150 lazy app modules. Build updates are explicit.

## Self-hosting

You need:

- [Bun](https://bun.sh/) with its built-in PostgreSQL `SQL` API.
- A running [PostgreSQL](https://www.postgresql.org/) server and an empty database.
- [FFmpeg and FFprobe](https://ffmpeg.org/) on your `PATH`, with the encoders required by the media pipeline.
- Internet access to acquire missing client assets.

> **Checkout status:** `src/client/` and `src/media/` are still absent from the published source. The server, client fetcher, and seed script import these modules. The ignore rules have been corrected; the setup below requires those source files to be committed first.

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

Acquire the pinned client, generate demo content, and start the server:

```sh
bun run fetch-client
SEED_PASSWORD='choose-a-local-test-password' bun run seed
bun run start
```

The seed command prints the generated video IDs. Open `http://localhost:8080/watch?v=VIDEO_ID` using one of those IDs. Local sign-in and registration are available at `/signin` and `/register`. The home feed is still pending.

Migrations run when the application or seed command starts. The demo accounts are `alice` and `bob`; they use the `SEED_PASSWORD` supplied to the seed command when first created.

### Configuration

Bun loads a project-root `.env` file automatically. Environment variables can also be exported in your shell.

| Variable | Default | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | `postgres://owntube:owntube@localhost:5432/owntube` | PostgreSQL connection |
| `PORT` | `8080` | HTTP listen port |
| `PUBLIC_ORIGIN` | `http://localhost:$PORT` | Public origin used in generated URLs and authentication |
| `INSTANCE_NAME` | `OwnTube` | Instance name |
| `MEDIA_DIR` | `data/media` | Local media directory |
| `MAX_UPLOAD_BYTES` | `2147483648` | Configured request/upload size limit; the upload UI is pending |
| `UPSTREAM_ASSET_FETCH` | Off | Set to `1` to enable the development fallback for missing client assets |
| `NO_WORKER` | Unset | Set to `1` to skip starting the processing worker |
| `LOG_REQUESTS` | Unset | Set to `1` to log requests |

Normal asset serving uses the local archive. The development upstream fallback is off by default. The downloaded client archive and media directories are allowed by this repository's current ignore rules; credentials and raw HAR captures remain ignored.

## Admin panel design

The selected admin panel design is in [docs/admin-panel/](docs/admin-panel/README.md), including the editable [browser preview](docs/admin-panel/index.html), local fonts, light/dark screenshots, a working appearance selector, and the implementation handoff. Use this design as the starting point when building real admin functionality.

## Development

Use the official client to verify compatibility. An endpoint returning successfully is only part of a working page: navigation, player behavior, and persisted state need browser checks too.

| Command | Purpose |
| --- | --- |
| `bun scripts/fetch-client.ts --check` | Check the local archive against the pin without downloading |
| `bun scripts/fetch-client.ts --update` | Explicitly acquire and pin a newer client build |
| `bun scripts/seed.ts --reprocess` | Reprocess the seeded videos |
| `bun scripts/probe.ts '/watch?v=VIDEO_ID' --play --shot watch.png` | Inspect the watch page and save a screenshot |
| `bun scripts/e2e/playback.ts VIDEO_ID --shots evidence/playback` | Exercise the official player and capture screenshots |

The browser tools use `playwright-core` and require a compatible Chromium installation. Set `CHROME_PATH` to its executable path; see [`scripts/probe.ts`](scripts/probe.ts) for the launch configuration.

Useful starting points:

- [`src/server.ts`](src/server.ts): request routing and application startup.
- [`src/innertube/`](src/innertube/): API handlers and YouTube-compatible response structures.
- [`src/instance.ts`](src/instance.ts): local authentication and instance routes.
- [`migrations/`](migrations/): database schema.
- [`scripts/research/`](scripts/research/): browser capture and investigation tools.
- [`scripts/e2e/playback.ts`](scripts/e2e/playback.ts): playback verification.

When reporting a bug, include the pinned build, affected route, reproduction steps, and relevant console or server errors. Sanitize captures before sharing them.

## Credits

The architecture is inspired by [Meowcord](https://github.com/meowcorded/meowcord/) and [Xitter](https://github.com/Xittered/xitter): serve the actual client and implement a compatible backend.

Useful protocol research references include [YouTube.js](https://github.com/LuanRT/YouTube.js), [yt-dlp](https://github.com/yt-dlp/yt-dlp), and [Invidious](https://github.com/iv-org/invidious).

---

<p align="center"><sub>Actual client. Independent backend. OwnTube.</sub></p>
