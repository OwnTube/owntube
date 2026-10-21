// UMP, the framing googlevideo uses when the player adds ump=1: a sequence
// of parts, each <varint type><varint size><payload>. For a plain range
// request the player reads MEDIA (21: one header-id byte, then bytes) and
// MEDIA_END (22: the header id). Varints take 1 to 5 bytes, sized by the
// first byte's leading one bits; the 5-byte form is 0xF0 + uint32 LE.

export function umpVarint(n: number): Uint8Array {
	if (n < 0x80) return Uint8Array.of(n);
	if (n < 0x4000) return Uint8Array.of(0x80 | (n & 0x3f), n >>> 6);
	if (n < 0x200000) return Uint8Array.of(0xc0 | (n & 0x1f), (n >>> 5) & 0xff, n >>> 13);
	if (n < 0x10000000) return Uint8Array.of(0xe0 | (n & 0x0f), (n >>> 4) & 0xff, (n >>> 12) & 0xff, n >>> 20);
	const b = new Uint8Array(5);
	b[0] = 0xf0;
	new DataView(b.buffer).setUint32(1, n, true);
	return b;
}

export const UMP_MEDIA = 21;
export const UMP_MEDIA_END = 22;

export function umpPartHeader(type: number, size: number): Uint8Array {
	const t = umpVarint(type);
	const s = umpVarint(size);
	const out = new Uint8Array(t.length + s.length);
	out.set(t);
	out.set(s, t.length);
	return out;
}

// body for one byte range: MEDIA(headerId, bytes) then MEDIA_END(headerId).
// The bytes must be in memory: Bun drops a lazy file slice placed inside a
// composed Blob.
export function umpMediaBody(data: Uint8Array, headerId = 0): Uint8Array {
	const head = umpPartHeader(UMP_MEDIA, data.byteLength + 1);
	const end = umpPartHeader(UMP_MEDIA_END, 1);
	const out = new Uint8Array(new ArrayBuffer(head.length + 1 + data.byteLength + end.length + 1));
	let p = 0;
	out.set(head, p);
	p += head.length;
	out[p++] = headerId;
	out.set(data, p);
	p += data.byteLength;
	out.set(end, p);
	p += end.length;
	out[p] = headerId;
	return out;
}
