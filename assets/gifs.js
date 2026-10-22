// OwnTube: a GIF button for the official client's comment boxes (src/gifs.ts).
//
// The button opens a picker that searches KLIPY through this instance. A
// picked GIF is shown in the box; when the box's Comment button sends
// comment/create_comment or create_comment_reply, the request gets the GIF's
// signed token as `owntubeGif`, and the server stores it with the comment.
// The client then shows the GIF itself, as it does for GIF comments on
// YouTube. With an empty box, a zero-width space lets the client submit; the
// server drops it.
(() => {
	if (window.__owntubeGifs) return;
	window.__owntubeGifs = true;

	const CREATE = /\/youtubei\/v1\/comment\/create_comment(_reply)?$/;
	const ZWSP = "​";
	// the GIF attached to each comment box, and the box that is posting
	const attached = new WeakMap();
	let posting = null;

	// ---- the request hook: in place before the app's own scripts ----
	const originalFetch = window.fetch;
	window.fetch = async function (input, init) {
		const box = posting;
		const gif = box && attached.get(box);
		if (!gif) return originalFetch.apply(this, arguments);
		const request = new Request(input, init);
		if (request.method !== "POST" || !CREATE.test(new URL(request.url, location.href).pathname)) return originalFetch.apply(this, arguments);
		posting = null;
		let bytes = new Uint8Array(await request.clone().arrayBuffer());
		const headers = new Headers(request.headers);
		if (headers.get("content-encoding") === "gzip" || (bytes[0] === 0x1f && bytes[1] === 0x8b)) {
			bytes = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer());
			headers.delete("content-encoding");
		}
		const body = JSON.parse(new TextDecoder().decode(bytes));
		body.owntubeGif = gif.token;
		const response = await originalFetch.call(this, new Request(request, { body: JSON.stringify(body), headers }));
		if (response.ok) detach(box);
		return response;
	};

	// the box whose Comment button was pressed (or Ctrl+Enter typed in)
	document.addEventListener(
		"click",
		(e) => {
			const box = e.target instanceof Element && e.target.closest("ytd-commentbox");
			if (!box) return;
			if (e.target.closest("#submit-button")) posting = box;
			else if (e.target.closest("#cancel-button")) detach(box);
		},
		true,
	);
	document.addEventListener(
		"keydown",
		(e) => {
			if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && e.target instanceof Element) {
				const box = e.target.closest("ytd-commentbox");
				if (box) posting = box;
			}
		},
		true,
	);

	// ---- styles: YouTube's light and dark colours (the pinned build's own
	// colour variables have generated names, so they're restated here; the
	// client sets html[dark] in dark mode) ----
	const css = `
:root{--otg-bg:#fff;--otg-field:#fff;--otg-text:#0f0f0f;--otg-text-2:#606060;--otg-line:rgba(0,0,0,.1);--otg-tint:rgba(0,0,0,.05);--otg-hover:rgba(0,0,0,.1);--otg-blue:#065fd4}
html[dark]{--otg-bg:#282828;--otg-field:#121212;--otg-text:#f1f1f1;--otg-text-2:#aaa;--otg-line:rgba(255,255,255,.2);--otg-tint:rgba(255,255,255,.1);--otg-hover:rgba(255,255,255,.2);--otg-blue:#3ea6ff}
.otg-button{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;margin:0 4px 0 0;padding:0;border:0;border-radius:50%;background:none;color:var(--otg-text);cursor:pointer;flex:none}
.otg-button:hover,.otg-button[aria-expanded=true]{background:var(--otg-hover)}
.otg-button span{font:500 11px/1 Roboto,Arial,sans-serif;letter-spacing:.3px;border:1.5px solid currentColor;border-radius:4px;padding:2px 3px}
.otg-picker{position:absolute;z-index:3000;width:360px;max-width:calc(100vw - 16px);height:420px;max-height:calc(100vh - 16px);display:flex;flex-direction:column;border-radius:12px;background:var(--otg-bg);color:var(--otg-text);box-shadow:0 4px 32px rgba(0,0,0,.2);font:400 14px/20px Roboto,Arial,sans-serif;overflow:hidden}
.otg-head{display:flex;gap:8px;align-items:center;padding:12px}
.otg-head input{flex:1;min-width:0;height:40px;padding:0 16px;border:1px solid var(--otg-line);border-radius:20px;background:var(--otg-field);color:inherit;font:inherit;outline:none}
.otg-head input:focus{border-color:var(--otg-blue)}
.otg-head input::-webkit-search-cancel-button{display:none}
.otg-stars{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex:none;padding:0;border:1px solid var(--otg-line);border-radius:50%;background:none;color:var(--otg-text);cursor:pointer}
.otg-stars:hover{background:var(--otg-hover)}
.otg-stars[aria-pressed=true]{background:var(--otg-tint);color:#f9ab00}
.otg-stars svg,.otg-star svg{width:20px;height:20px;fill:currentColor}
.otg-grid{flex:1;overflow-y:auto;padding:0 12px 12px;columns:2;column-gap:8px}
.otg-tile{position:relative;margin:0 0 8px;border-radius:8px;overflow:hidden;background:var(--otg-tint);break-inside:avoid;line-height:0}
.otg-pick{display:block;width:100%;padding:0;border:0;background:none;cursor:pointer}
.otg-pick:focus-visible{outline:2px solid var(--otg-blue);outline-offset:-2px;border-radius:8px}
.otg-tile img{display:block;width:100%;height:auto}
.otg-star{position:absolute;top:4px;right:4px;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:0;border-radius:50%;background:rgba(0,0,0,.45);color:#fff;cursor:pointer;opacity:0;transition:opacity .1s}
.otg-star svg{width:18px;height:18px}
.otg-tile:hover .otg-star,.otg-star:focus-visible,.otg-star[aria-pressed=true]{opacity:1}
.otg-star[aria-pressed=true]{color:#fdd663}
.otg-note{padding:24px 12px;color:var(--otg-text-2);text-align:center;column-span:all;line-height:20px}
.otg-attachment{position:relative;display:inline-block;margin:8px 0 0;border-radius:8px;overflow:hidden;line-height:0}
.otg-attachment img{max-width:228px;max-height:128px}
.otg-remove{position:absolute;top:4px;right:4px;width:24px;height:24px;border:0;border-radius:50%;background:rgba(0,0,0,.6);color:#fff;font-size:16px;line-height:1;cursor:pointer}
`;
	const addStyle = () => {
		const s = document.createElement("style");
		s.textContent = css;
		document.head.appendChild(s);
	};

	const SVG = "http://www.w3.org/2000/svg";
	const STAR = "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
	const STAR_OUTLINE = "m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z";
	function star(filled) {
		const svg = document.createElementNS(SVG, "svg");
		svg.setAttribute("viewBox", "0 0 24 24");
		const path = document.createElementNS(SVG, "path");
		path.setAttribute("d", filled ? STAR : STAR_OUTLINE);
		svg.append(path);
		return svg;
	}

	// ---- the picker ----
	let picker = null;
	let forBox = null;
	let forButton = null;
	let query = "";
	let showStars = false;
	let next = 1;
	let loading = false;
	let timer = 0;

	function el(tag, props = {}, ...children) {
		const e = document.createElement(tag);
		Object.assign(e, props);
		for (const c of children) e.append(c);
		return e;
	}

	function buildPicker() {
		const input = el("input", { type: "search", placeholder: "Search KLIPY", ariaLabel: "Search GIFs" });
		const stars = el("button", { type: "button", className: "otg-stars", ariaLabel: "Favorite GIFs", title: "Favorites" }, star(true));
		stars.setAttribute("aria-pressed", "false");
		const grid = el("div", { className: "otg-grid" });
		const p = el("div", { className: "otg-picker", role: "dialog", ariaLabel: "Choose a GIF" }, el("div", { className: "otg-head" }, input, stars), grid);
		input.addEventListener("input", () => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				setStars(false);
				load(input.value.trim(), true);
			}, 300);
		});
		p.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				e.stopPropagation();
				closePicker();
				forButton?.focus();
			}
		});
		stars.addEventListener("click", () => {
			setStars(!showStars);
			load(showStars ? "" : input.value.trim(), true);
		});
		grid.addEventListener("scroll", () => {
			if (grid.scrollTop + grid.clientHeight > grid.scrollHeight - 200) load(query, false);
		});
		return p;
	}

	function setStars(on) {
		showStars = on;
		picker.querySelector(".otg-stars").setAttribute("aria-pressed", String(on));
	}

	function note(text) {
		const grid = picker.querySelector(".otg-grid");
		grid.querySelector(".otg-note")?.remove();
		if (text) grid.append(el("div", { className: "otg-note", textContent: text }));
	}

	function starButton(item) {
		const b = el("button", { type: "button", className: "otg-star" });
		const show = () => {
			b.replaceChildren(star(item.favorite));
			b.setAttribute("aria-pressed", String(item.favorite));
			b.ariaLabel = item.favorite ? "Remove from favorites" : "Add to favorites";
			b.title = b.ariaLabel;
		};
		show();
		b.addEventListener("click", async () => {
			const want = !item.favorite;
			item.favorite = want;
			show();
			try {
				const res = await originalFetch("/_ot/gifs/favorites", { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ token: item.token, favorite: want }) });
				if (!res.ok) throw new Error(String(res.status));
			} catch {
				item.favorite = !want;
				show();
			}
		});
		return b;
	}

	function tile(item) {
		const pick = el("button", { type: "button", className: "otg-pick", title: item.title, ariaLabel: item.title || "GIF" }, el("img", { src: item.preview, alt: "", width: item.width, height: item.height, loading: "lazy" }));
		pick.addEventListener("click", () => {
			attach(forBox, item);
			closePicker();
		});
		return el("div", { className: "otg-tile" }, pick, starButton(item));
	}

	async function load(q, fresh) {
		const view = showStars ? "stars" : "search";
		if (fresh) {
			query = q;
			next = 1;
			loading = false;
			picker.querySelector(".otg-grid").replaceChildren();
		}
		if (loading || !next) return;
		loading = true;
		const asked = `${view}:${query}`;
		const url = view === "stars" ? "/_ot/gifs/favorites" : `/_ot/gifs/search?${new URLSearchParams({ q: query, page: String(next) })}`;
		try {
			const res = await originalFetch(url, { credentials: "same-origin" });
			const data = await res.json();
			if (asked !== `${showStars ? "stars" : "search"}:${query}`) return;
			if (!res.ok) {
				note(data.error || "GIFs aren't available right now.");
				next = 0;
				return;
			}
			const grid = picker.querySelector(".otg-grid");
			for (const item of data.items) grid.append(tile(item));
			next = data.next;
			note(grid.children.length ? "" : view === "stars" ? "Star a GIF to keep it here." : query ? "No GIFs found" : "");
		} catch {
			note("GIFs aren't available right now.");
		} finally {
			if (asked === `${showStars ? "stars" : "search"}:${query}`) loading = false;
		}
	}

	function openPicker(box, button) {
		if (picker?.isConnected && forBox === box) return closePicker();
		if (!picker) picker = buildPicker();
		closePicker();
		forBox = box;
		forButton = button;
		button.setAttribute("aria-expanded", "true");
		document.body.append(picker);
		// above the box, lined up with its left edge
		const r = button.getBoundingClientRect();
		const left = (box.querySelector("#creation-box") ?? button).getBoundingClientRect().left;
		const h = Math.min(420, innerHeight - 16);
		const w = Math.min(360, innerWidth - 16);
		// in page coordinates, so it moves with the box when the page scrolls
		picker.style.left = `${scrollX + Math.max(8, Math.min(left, innerWidth - w - 8))}px`;
		picker.style.top = `${scrollY + (r.top - h - 8 >= 8 ? r.top - h - 8 : Math.min(r.bottom + 8, innerHeight - h - 8))}px`;
		const input = picker.querySelector("input");
		input.value = "";
		setStars(false);
		load("", true);
		input.focus();
	}

	function closePicker() {
		picker?.remove();
		forButton?.setAttribute("aria-expanded", "false");
		forBox = null;
	}
	document.addEventListener("mousedown", (e) => {
		if (picker?.isConnected && !picker.contains(e.target) && !(e.target instanceof Element && e.target.closest(".otg-button"))) closePicker();
	});

	// ---- the attachment in a comment box ----
	const editor = (box) => box.querySelector("#contenteditable-root");

	function attach(box, item) {
		if (!box) return;
		detach(box);
		attached.set(box, item);
		const remove = el("button", { type: "button", className: "otg-remove", ariaLabel: "Remove GIF", textContent: "×" });
		remove.addEventListener("click", () => detach(box));
		const preview = el("div", { className: "otg-attachment" }, el("img", { src: item.preview, alt: item.title || "GIF" }), remove);
		(box.querySelector("#creation-box") ?? box).append(preview);
		// an empty box can't be submitted; a zero-width space makes it non-empty
		const ed = editor(box);
		if (ed && !ed.textContent.replace(ZWSP, "").trim()) {
			ed.textContent = ZWSP;
			ed.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true, inputType: "insertText", data: ZWSP }));
		}
	}

	function detach(box) {
		if (!box) return;
		attached.delete(box);
		box.querySelectorAll(".otg-attachment").forEach((e) => e.remove());
		const ed = editor(box);
		if (ed && ed.textContent === ZWSP) {
			ed.textContent = "";
			ed.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true, inputType: "deleteContentBackward" }));
		}
	}

	// ---- a GIF button in every comment box ----
	function addButtons() {
		for (const footer of document.querySelectorAll("ytd-commentbox #footer")) {
			if (footer.querySelector(".otg-button")) continue;
			const box = footer.closest("ytd-commentbox");
			const button = el("button", { type: "button", className: "otg-button", ariaLabel: "Add a GIF", title: "GIF" }, el("span", { textContent: "GIF" }));
			button.setAttribute("aria-haspopup", "dialog");
			button.setAttribute("aria-expanded", "false");
			button.addEventListener("click", () => openPicker(box, button));
			const emoji = footer.querySelector("#emoji-button");
			if (emoji) emoji.after(button);
			else footer.prepend(button);
		}
	}

	const start = () => {
		addStyle();
		addButtons();
		new MutationObserver(addButtons).observe(document.body, { childList: true, subtree: true });
	};
	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
	else start();
})();
