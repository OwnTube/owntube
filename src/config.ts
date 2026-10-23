// Instance configuration from the environment.

export const PORT = Number(process.env.PORT ?? 8080);
export const PUBLIC_ORIGIN = (process.env.PUBLIC_ORIGIN ?? `http://localhost:${PORT}`).replace(/\/$/, "");
export const PUBLIC_HOST = new URL(PUBLIC_ORIGIN).host;
// YouTube Studio (upload dialog, creator pages) is a separate client on its
// own origin, as studio.youtube.com is: its paths (/channel/UC.../videos)
// overlap the main client's. The server answers it on STUDIO_PORT, and on
// the main port for requests whose Host is the Studio host (a reverse proxy
// in front of both). Defaults: the next port on localhost, else studio.<host>.
const publicUrl = new URL(PUBLIC_ORIGIN);
const localHost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(publicUrl.hostname);
export const STUDIO_PORT = Number(process.env.STUDIO_PORT ?? PORT + 1);
export const STUDIO_ORIGIN = (process.env.STUDIO_ORIGIN ?? (localHost ? `${publicUrl.protocol}//${publicUrl.hostname}:${STUDIO_PORT}` : `${publicUrl.protocol}//studio.${publicUrl.host}`)).replace(/\/$/, "");
export const STUDIO_HOST = new URL(STUDIO_ORIGIN).host;
// Sessions are shared between both origins. Cookies ignore ports, so on
// localhost nothing is needed; on two hostnames set the parent domain
// (e.g. COOKIE_DOMAIN=example.com for example.com and studio.example.com).
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN ?? "";
export const DATABASE_URL = process.env.DATABASE_URL ?? "postgres://yewtube:yewtube@localhost:5432/yewtube";
export const MEDIA_DIR = process.env.MEDIA_DIR ?? "data/media";
export const INSTANCE_NAME = process.env.INSTANCE_NAME ?? "yewtube";
// Development aid: fetch a client asset the pin does not have from its
// upstream host on first use, archive it and list it in client/observed.txt
// for the next `fetch-client --observed`. Off by default: normal operation
// serves only the archive.
export const UPSTREAM_ASSET_FETCH = process.env.UPSTREAM_ASSET_FETCH === "1";
export const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 2 * 1024 ** 3);
export const SECURE_COOKIES = PUBLIC_ORIGIN.startsWith("https://");
// GIFs in comments (src/gifs.ts): off unless the host supplies a KLIPY API key
export const KLIPY_API_KEY = process.env.KLIPY_API_KEY ?? "";
export const KLIPY_CONTENT_FILTER = process.env.KLIPY_CONTENT_FILTER ?? "high";
