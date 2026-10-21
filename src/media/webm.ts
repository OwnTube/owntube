// WebM byte ranges for DASH: indexRange is the Cues element, and initRange
// runs from the EBML header up to it. ffmpeg writes Cues before the first
// Cluster with `-dash 1 -cues_to_front 1`, the layout YouTube's WebM formats
// use. The player assumes the two ranges are adjacent (it fetches
// initRange.start..indexRange.end in one request and never asks for the
// init range on its own), so elements between Tracks and Cues (Tags, Void)
// are counted as part of the init range.

import { closeSync, fstatSync, openSync, readSync } from "node:fs";
import type { DashRanges } from "./mp4";

const SEGMENT = 0x18538067;
const TRACKS = 0x1654ae6b;
const CUES = 0x1c53bb6b;
const CLUSTER = 0x1f43b675;

function vint(b: Buffer, pos: number, keepMarker: boolean): { value: number; len: number } {
	const first = b[pos];
	let len = 1;
	while (len <= 8 && !(first & (0x80 >> (len - 1)))) len++;
	if (len > 8) throw new Error("bad EBML vint");
	let value = keepMarker ? first : first & (0xff >> len);
	for (let i = 1; i < len; i++) value = value * 256 + b[pos + i];
	return { value, len };
}

export function webmRanges(path: string): DashRanges {
	const fd = openSync(path, "r");
	try {
		const size = fstatSync(fd).size;
		const head = Buffer.alloc(Math.min(size, 4 * 1024 * 1024));
		readSync(fd, head, 0, head.length, 0);
		let pos = 0;
		// EBML header
		const ebmlId = vint(head, pos, true);
		const ebmlSize = vint(head, pos + ebmlId.len, false);
		pos += ebmlId.len + ebmlSize.len + ebmlSize.value;
		const segId = vint(head, pos, true);
		if (segId.value !== SEGMENT) throw new Error("no Segment");
		const segSize = vint(head, pos + segId.len, false);
		pos += segId.len + segSize.len;
		let tracksEnd = -1;
		let cues: [number, number] | undefined;
		while (pos < head.length - 12) {
			const id = vint(head, pos, true);
			const sz = vint(head, pos + id.len, false);
			const end = pos + id.len + sz.len + sz.value;
			if (id.value === TRACKS) tracksEnd = end - 1;
			else if (id.value === CUES) cues = [pos, end - 1];
			else if (id.value === CLUSTER) break;
			pos = end;
		}
		if (tracksEnd < 0 || !cues) throw new Error(`${path}: Tracks or front Cues missing`);
		return { initStart: 0, initEnd: cues[0] - 1, indexStart: cues[0], indexEnd: cues[1] };
	} finally {
		closeSync(fd);
	}
}
