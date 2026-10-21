// Instance configuration from the environment.

export const PORT = Number(process.env.PORT ?? 8080);
export const PUBLIC_ORIGIN = (process.env.PUBLIC_ORIGIN ?? `http://localhost:${PORT}`).replace(/\/$/, "");
export const PUBLIC_HOST = new URL(PUBLIC_ORIGIN).host;
export const DATABASE_URL = process.env.DATABASE_URL ?? "postgres://owntube:owntube@localhost:5432/owntube";
export const MEDIA_DIR = process.env.MEDIA_DIR ?? "data/media";
export const INSTANCE_NAME = process.env.INSTANCE_NAME ?? "OwnTube";
// Development aid: fetch a client asset the pin does not have from its
// upstream host on first use, archive it and list it in client/observed.txt
// for the next `fetch-client --observed`. Off by default: normal operation
// serves only the archive.
export const UPSTREAM_ASSET_FETCH = process.env.UPSTREAM_ASSET_FETCH === "1";
export const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 2 * 1024 ** 3);
export const SECURE_COOKIES = PUBLIC_ORIGIN.startsWith("https://");
