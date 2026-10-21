# OwnTube development instructions

OwnTube serves the actual YouTube web client against an independent database, backend, APIs, and media storage. Keep the official public client as the main browsing and playback interface, with only necessary compatibility patches.

## Admin panel: use the selected design

Before implementing or changing the admin panel, read [docs/admin-panel/README.md](docs/admin-panel/README.md), open [docs/admin-panel/index.html](docs/admin-panel/index.html), and inspect [docs/admin-panel/preview.png](docs/admin-panel/preview.png).

The project owner revised the design to give OwnTube its own identity. Use the current Control room reference: Manrope typography, Lucide line icons, horizontal navigation, warm light/dark palettes, red scribble accents, a statistics strip, a library table, and an operations column. This supersedes the earlier Creator Studio-like layout. Preserve the current OwnTube identity and extend it with real functioning features. Reuse the reference code and add new screens consistently.

The reference contains sample data and demo feedback only. Replace those with real authenticated admin routes, database queries, persisted mutations, media/job integration, and working navigation. Implement server-side operator authorization for every admin API operation. Verify the behavior in the browser and preserve the public client's functionality.

Use the handoff's implementation and validation checklist. Do not treat the mockup as a finished admin panel or start a wholesale redesign without a new request from the owner.

## Appearance must follow the user

Implement both light and dark versions of the admin panel. Support Light theme, Dark theme, and Use device theme. When the main application's appearance selector is available, honor that same saved per-user choice instead of creating a conflicting admin-only setting. Until then, preserve the reference's working device-default behavior and explicit persisted choices. Resolve appearance before first paint, react to device changes only in device mode, and verify both palettes. See the handoff for integration details and both screenshots.
