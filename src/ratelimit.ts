// Fixed-window counters in Postgres, so limits survive restarts and hold
// across processes. Returns false once `max` hits fall in the window.
import { sql } from "./db";

export async function rateLimit(key: string, max: number, windowSeconds: number): Promise<boolean> {
	const [r] = await sql`insert into rate_limits (key, window_start, count) values (${key}, now(), 1)
		on conflict (key) do update set
			count = case when rate_limits.window_start < now() - ${`${windowSeconds} seconds`}::interval then 1 else rate_limits.count + 1 end,
			window_start = case when rate_limits.window_start < now() - ${`${windowSeconds} seconds`}::interval then now() else rate_limits.window_start end
		returning count`;
	return r.count <= max;
}
