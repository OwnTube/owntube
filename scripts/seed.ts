// Seeds a small, reproducible dataset: two accounts with channels and a few
// generated test videos (ffmpeg lavfi sources, so no third-party media),
// processed through the normal pipeline.
//
//   bun scripts/seed.ts              creates what is missing
//   bun scripts/seed.ts --reprocess  also re-encodes every video (after a pipeline change)
//   SEED_PASSWORD=... to choose the accounts' password (default: owntube-demo)

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { register } from "../src/auth";
import { MEDIA_DIR } from "../src/config";
import { migrate, sql } from "../src/db";
import { newVideoId } from "../src/ids";
import { enqueue, runQueueOnce } from "../src/media/process";

const PASSWORD = process.env.SEED_PASSWORD ?? "owntube-demo";

const ACCOUNTS = [
	{ login: "alice", name: "Alice Makes Things", about: "Test patterns, tones and other generated footage." },
	{ login: "bob", name: "Bob's Lab", about: "Fractals and cellular automata." },
];

const VIDEOS = [
	{ owner: "alice", title: "Test pattern with a 440 Hz tone", description: "A generated SMPTE-style test card with a steady 440 Hz tone. Good for checking playback, seeking and volume.", src: "testsrc2=size=1280x720:rate=30", audio: "sine=frequency=440:sample_rate=44100", seconds: 40 },
	{ owner: "alice", title: "Colour bars, 30 seconds", description: "Colour bars and a 1 kHz tone.", src: "smptehdbars=size=1280x720:rate=30", audio: "sine=frequency=1000:sample_rate=44100", seconds: 30 },
	{ owner: "bob", title: "Mandelbrot zoom", description: "A slow zoom into the Mandelbrot set, rendered by ffmpeg.", src: "mandelbrot=size=854x480:rate=25", audio: "sine=frequency=220:sample_rate=44100", seconds: 25 },
	{ owner: "bob", title: "Game of Life", description: "Conway's Game of Life from a random start.", src: "life=size=640x360:rate=30:mold=10:ratio=0.2:death_color=#202040:life_color=#40d0ff,scale=1280:720:flags=neighbor", audio: "anoisesrc=color=pink:amplitude=0.05:sample_rate=44100", seconds: 20 },
	{ owner: "alice", title: "Gradient sweep (vertical video)", description: "A portrait video, to check how the player letterboxes it.", src: "gradients=size=720x1280:rate=30:speed=0.02", audio: "sine=frequency=330:sample_rate=44100", seconds: 15 },
];

await migrate();
const sourceDir = join(MEDIA_DIR, "sources");
mkdirSync(sourceDir, { recursive: true });

for (const a of ACCOUNTS) {
	const [u] = await sql`select id from users where login = ${a.login}`;
	if (u) continue;
	const r = await register(a.login, PASSWORD, a.name);
	if ("error" in r) throw new Error(r.error);
	await sql`update channels set description = ${a.about} where user_id = ${r.userId}`;
	console.log(`account ${a.login} / ${PASSWORD}`);
}

for (const v of VIDEOS) {
	const [exists] = await sql`select id from videos where title = ${v.title}`;
	if (exists) continue;
	const [c] = await sql`select c.id from channels c join users u on u.id = c.user_id where u.login = ${v.owner}`;
	const id = newVideoId();
	const file = join(sourceDir, `${id}.mp4`);
	if (!existsSync(file)) {
		const p = Bun.spawn(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", v.src, "-f", "lavfi", "-i", v.audio, "-t", String(v.seconds), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-shortest", file], { stderr: "inherit" });
		if ((await p.exited) !== 0) throw new Error(`ffmpeg failed for ${v.title}`);
	}
	await sql`insert into videos (id, channel_id, title, description, source_path) values (${id}, ${c.id}, ${v.title}, ${v.description}, ${file})`;
	await enqueue(id);
	console.log(`video ${id}: ${v.title}`);
}

if (process.argv.includes("--reprocess")) for (const r of await sql`select id from videos where deleted_at is null`) await enqueue(r.id);
while (await runQueueOnce()) {}
const rows = await sql`select id, title, status, error from videos order by created_at`;
for (const r of rows) console.log(`${r.status.padEnd(10)} ${r.id} ${r.title}${r.error ? ` (${r.error})` : ""}`);
process.exit(0);
