// The continuation item feeds, comments and playlists end their lists with.

export function continuationItem(token: string, apiUrl: string, request?: string) {
	return {
		continuationItemRenderer: {
			trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN",
			continuationEndpoint: {
				commandMetadata: { webCommandMetadata: { sendPost: true, apiUrl } },
				continuationCommand: { token, request: request ?? (apiUrl.endsWith("/next") ? "CONTINUATION_REQUEST_TYPE_WATCH_NEXT" : apiUrl.endsWith("/search") ? "CONTINUATION_REQUEST_TYPE_SEARCH" : "CONTINUATION_REQUEST_TYPE_BROWSE") },
			},
		},
	};
}
