// /youtubei/v1/get_panel: dialogs and sheets the client loads by panel id
// (showDialogCommand.panelLoadingStrategy.requestTemplate.panelId), and
// /youtubei/v1/submit_form, which their forms post by submit id
// (formSchema.submitConfig.submitId) with {formData, submitBehavior}.

import type { Viewer } from "../client/page";
import { recordMiss } from "../diagnostics";
import { responseContext } from "./r";
import { ApiError, route } from "./router";

type Panel = (body: any, viewer: Viewer) => Promise<unknown> | unknown;
const panels = new Map<string, Panel>();

export function panel(id: string, fn: Panel) {
	panels.set(id, fn);
}

route("get_panel", async ({ body, viewer }) => {
	const fn = panels.get(String(body.panelId ?? ""));
	if (fn) return fn(body, viewer);
	recordMiss(`youtubei get_panel:${String(body.panelId ?? "").slice(0, 60)}`, JSON.stringify({ panelId: body.panelId, params: body.params }).slice(0, 400));
	return { responseContext: responseContext(viewer) };
});

type Form = (formData: any, viewer: NonNullable<Viewer>) => Promise<unknown> | unknown;
const forms = new Map<string, Form>();

export function form(submitId: string, fn: Form) {
	forms.set(submitId, fn);
}

route(
	"submit_form",
	async ({ body, viewer }) => {
		const fn = forms.get(String(body.submitId ?? ""));
		if (!fn) {
			recordMiss(`youtubei submit_form:${String(body.submitId ?? "").slice(0, 60)}`, "");
			throw new ApiError(400, "Unknown form.");
		}
		const out = await fn(body.formData ?? {}, viewer!);
		return { responseContext: responseContext(viewer), ...(out ?? {}) };
	},
	{ mutation: true },
);
