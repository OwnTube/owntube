// Comments on the watch page: filled in by the next continuation.
import type { Viewer } from "../client/page";
import { responseContext } from "./r";

export async function commentsContinuation(_tok: { v: string; s?: string; c?: string; o?: number }, viewer: Viewer) {
	return { responseContext: responseContext(viewer), onResponseReceivedEndpoints: [] };
}
