# OwnTube development instructions

OwnTube serves the actual YouTube web client against an independent database, backend, APIs, and media storage. Keep the official public client as the main browsing and playback interface, with only necessary compatibility patches.

## Admin panel

The owner dropped the earlier mockup in [docs/admin-panel/](docs/admin-panel/README.md); it is kept for history only. The live panel is in [src/admin/](src/admin/) (`ui.ts` for the layout and components, `index.ts` for routes and actions). Extend it consistently:

- Every `/admin` route checks the operator server-side. Signed-out GET requests redirect to sign-in; anyone else who is not an operator gets a 404, so the panel's existence is not revealed.
- Every mutation is a same-origin POST carrying the viewer's form token, ends in a redirect back to the page with a `done` code, and is written to `admin_actions` (the Audit log).
- Use real queries and persisted state only: no sample figures, demo buttons, or placeholder features.
- Keep the shared layout: masthead with OwnTube's logo, left navigation (a chip bar on narrow screens), cards in a 3-column grid with 24 px gaps, tables that scroll horizontally rather than hide columns. Use YouTube's light/dark palettes, the bundled Roboto 400/500/700, and the inline Lucide-style icons in `ui.ts`. Use plain labels and factual copy.
- Verify changes in the browser in both palettes and at phone width, and keep the public client and Studio working.

## Appearance must follow the user

The admin panel has light and dark versions and supports Light theme, Dark theme, and Use device theme. It shares the main client's saved choice, the Appearance flags in the PREF cookie (see [src/appearance.ts](src/appearance.ts)); do not add an admin-only setting. Resolve the appearance on the server before first paint, follow device changes only in device mode (CSS `prefers-color-scheme`), and verify both palettes.
