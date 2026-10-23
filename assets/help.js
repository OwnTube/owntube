// Stands in for Google's in-product help and feedback service
// (www.gstatic.com/feedback/js/help/prod/service/lazy.min.js and
// www.google.com/tools/feedback/help_api.js), which the clients load by
// script URL and then look up as help.service.Lazy.create / help.api.Lazy.create.
// Feedback opens this instance's /feedback page; help opens YouTube's help
// center in a new tab; everything else does nothing.
(() => {
	const FEEDBACK = "__FEEDBACK_URL__";
	const HELP = "https://support.google.com/";
	const open = (url) => window.open(url, "_blank", "noopener");
	// the article Studio names for the page (supportContentUrl), else the help center
	const helpUrl = (o) =>
		o && typeof o.supportContentUrl === "string" && o.supportContentUrl.startsWith(HELP) ? o.supportContentUrl : HELP + String((o && (o.helpCenterPath || o.helpcenter)) || "youtube").replace(/^\//, "");
	const service = (config) =>
		new Proxy(
			{},
			{
				get(_, name) {
					// not a promise (then, Closure's $goog_Thenable marker)
					if (typeof name !== "string" || name === "then" || name.startsWith("$")) return undefined;
					if (name === "isHelpActionApplicable") return () => false;
					if (/feedback/i.test(name)) return () => (open(`${FEEDBACK}?page=${encodeURIComponent(location.href)}`), Promise.resolve());
					if (/^(start|open)/.test(name)) return (o) => (open(helpUrl(o || config)), Promise.resolve());
					return () => Promise.resolve();
				},
			},
		);
	const lazy = { create: service };
	window.help = window.help || {};
	window.help.service = window.help.service || {};
	window.help.service.Lazy = lazy;
	window.help.api = window.help.api || {};
	window.help.api.Lazy = lazy;
	window.help.api.HelpGuideLazy = lazy;
	// Studio's Send feedback (userfeedback.api.startFeedback) falls back to
	// Google's feedback loader, which calls this when the page defines it
	window.GOOGLE_FEEDBACK_START = (config) => (config && config.flow === "help" ? open(helpUrl(config)) : open(`${FEEDBACK}?page=${encodeURIComponent(location.href)}`));
})();
