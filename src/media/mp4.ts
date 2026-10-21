// Minimal ISO-BMFF reading: the byte ranges the player's DASH formats need
// (initRange = ftyp+moov, indexRange = sidx) and the RFC 6381 codec string
// from the sample description.

import { openSync, readSync, closeSync, fstatSync } from "node:fs";

export type Box = { type: string; start: number; size: number };

function readAt(fd: number, pos: number, len: number): Buffer {
	const b = Buffer.alloc(len);
	const n = readSync(fd, b, 0, len, pos);
	return b.subarray(0, n);
}

export function topLevelBoxes(path: string): Box[] {
	const fd = openSync(path, "r");
	try {
		const total = fstatSync(fd).size;
		const out: Box[] = [];
		let pos = 0;
		while (pos + 8 <= total) {
			const h = readAt(fd, pos, 16);
			let size = h.readUInt32BE(0);
			const type = h.toString("latin1", 4, 8);
			if (size === 1) size = Number(h.readBigUInt64BE(8));
			else if (size === 0) size = total - pos;
			if (size < 8) break;
			out.push({ type, start: pos, size });
			pos += size;
		}
		return out;
	} finally {
		closeSync(fd);
	}
}

export type DashRanges = { initStart: number; initEnd: number; indexStart: number; indexEnd: number };

// ranges are inclusive, as in the player response
export function dashRanges(path: string): DashRanges {
	const boxes = topLevelBoxes(path);
	const moov = boxes.find((b) => b.type === "moov");
	const sidx = boxes.find((b) => b.type === "sidx");
	if (!moov || !sidx) throw new Error(`${path} is not a fragmented MP4 with a sidx (boxes: ${boxes.map((b) => b.type).join(",")})`);
	if (sidx.start < moov.start) throw new Error("sidx before moov");
	return { initStart: 0, initEnd: moov.start + moov.size - 1, indexStart: sidx.start, indexEnd: sidx.start + sidx.size - 1 };
}

// codecs parameter from avcC/esds inside moov, e.g. avc1.4d401f, mp4a.40.2
export function codecString(path: string): string {
	const boxes = topLevelBoxes(path);
	const moov = boxes.find((b) => b.type === "moov");
	if (!moov) throw new Error("no moov");
	const fd = openSync(path, "r");
	try {
		const m = readAt(fd, moov.start, moov.size);
		const avcC = m.indexOf("avcC", 0, "latin1");
		if (avcC > 0) {
			const p = avcC + 4;
			return `avc1.${m.subarray(p + 1, p + 4).toString("hex")}`;
		}
		if (m.indexOf("mp4a", 0, "latin1") > 0) {
			// esds DecoderSpecificInfo: audioObjectType in the top 5 bits
			const esds = m.indexOf("esds", 0, "latin1");
			const tag5 = esds > 0 ? m.indexOf(Buffer.from([0x05]), esds + 8) : -1;
			let aot = 2;
			if (tag5 > 0) {
				let q = tag5 + 1;
				while (m[q] & 0x80) q++;
				q++;
				aot = m[q] >> 3;
			}
			return `mp4a.40.${aot}`;
		}
		throw new Error("unknown sample entry");
	} finally {
		closeSync(fd);
	}
}
