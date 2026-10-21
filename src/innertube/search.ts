import type { PageData, Viewer } from "../client/page";
export async function searchPage(_url: URL, _viewer: Viewer): Promise<PageData | Response | undefined> {
	return undefined;
}

export async function suggest(_url: URL): Promise<Response> {
	return new Response("", { status: 204 });
}
