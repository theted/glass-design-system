import { cloneElement as e, createContext as t, useContext as n, useEffect as r, useId as i, useLayoutEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
import { createPortal as f } from "react-dom";
//#region src/utils.ts
var p = (...e) => e.filter(Boolean).join(" "), m = (...e) => (t) => {
	for (let n of e) typeof n == "function" ? n(t) : n && (n.current = t);
}, h = (...e) => o(() => m(...e), e), g = (e) => `var(--space-${e})`, _ = {
	blur: 40,
	opacity: .66,
	sheen: .22,
	hue: 262,
	lightHue: 76,
	roundness: 1
}, v = t(_), y = {
	blur: (e) => ["--glass-blur", `${e}px`],
	opacity: (e) => ["--glass-opacity", String(e)],
	sheen: (e) => ["--glass-sheen", String(e)],
	hue: (e) => ["--glass-hue", String(e)],
	lightHue: (e) => ["--light-hue", String(e)],
	roundness: (e) => ["--glass-roundness", String(e)]
}, b = (e) => Object.fromEntries(Object.keys(y).filter((t) => e[t] !== void 0).map((t) => y[t](e[t]))), x = ({ children: e, className: t, style: r, ...i }) => {
	let a = n(v), { blur: s, opacity: c, sheen: l, hue: d, lightHue: f, roundness: m } = i, h = o(() => ({
		blur: s ?? a.blur,
		opacity: c ?? a.opacity,
		sheen: l ?? a.sheen,
		hue: d ?? a.hue,
		lightHue: f ?? a.lightHue,
		roundness: m ?? a.roundness
	}), [
		s,
		c,
		l,
		d,
		f,
		m,
		a
	]);
	return /* @__PURE__ */ u(v.Provider, {
		value: h,
		children: /* @__PURE__ */ u("div", {
			className: p("glass-scope", t),
			style: {
				...b(i),
				...r
			},
			children: e
		})
	});
}, ee = () => n(v), S = {
	x: .72,
	y: .18,
	angle: 45
}, C = (e, t = !0) => {
	r(() => {
		let n = e.current;
		if (!n || !t) return;
		let r = 0, i = S.angle, a = null, o = (e) => {
			i += ((e - i) % 360 + 540) % 360 - 180, n.style.setProperty("--glass-angle", `${i}deg`);
		}, s = (e, t) => {
			n.style.setProperty("--glass-x", e.toFixed(4)), n.style.setProperty("--glass-y", t.toFixed(4));
		}, c = () => {
			if (r = 0, !a) return;
			let { x: e, y: t } = a;
			a = null, s(e, t), o(Math.atan2(e - .5, .5 - t) * 180 / Math.PI);
		}, l = (e) => {
			if (e.pointerType === "touch") return;
			let t = n.getBoundingClientRect();
			a = {
				x: Math.min(1, Math.max(0, (e.clientX - t.left) / t.width)),
				y: Math.min(1, Math.max(0, (e.clientY - t.top) / t.height))
			}, r ||= requestAnimationFrame(c);
		}, u = () => {
			a = null, s(S.x, S.y), o(S.angle);
		};
		return n.addEventListener("pointermove", l), n.addEventListener("pointerleave", u), () => {
			cancelAnimationFrame(r), n.removeEventListener("pointermove", l), n.removeEventListener("pointerleave", u);
		};
	}, [e, t]);
}, w = (e, t = !0) => {
	a(() => {
		let n = e.current;
		if (!n || !t || typeof IntersectionObserver > "u") return;
		n.dataset.reveal = "pending";
		let r = new IntersectionObserver((e) => {
			e.some((e) => e.isIntersecting) && (n.dataset.reveal = "in", r.disconnect());
		}, {
			rootMargin: "0px 0px -8% 0px",
			threshold: .08
		});
		return r.observe(n), () => r.disconnect();
	}, [e, t]);
}, T = ({ as: e, intensity: t = "medium", padding: n = "md", radius: r, glow: i = !1, prism: a = !1, tilt: o = !1, reveal: c = !1, pointerLight: l = !0, className: d, ref: f, ...m }) => {
	let g = e ?? "div", _ = s(null), v = h(_, f);
	return C(_, l), w(_, c), /* @__PURE__ */ u(g, {
		ref: v,
		className: p("glass", t !== "medium" && `glass--${t}`, n !== "none" && `glass--pad-${n}`, r && `glass--radius-${r}`, i && "glass--glow", a && "glass--prism", o && "glass--tilt", c && "glass--reveal", d),
		...m
	});
}, E = [
	"kiln",
	"dusk",
	"aurora",
	"ember",
	"fjord",
	"abyss"
], D = [
	"none",
	"grain",
	"dots",
	"grid"
], O = ({ palette: e = "kiln", motion: t = !0, speed: n, strength: r, texture: i = "none", fixed: a = !1, className: o, style: s }) => /* @__PURE__ */ u("div", {
	"aria-hidden": "true",
	className: p("glass-backdrop", e !== "kiln" && `glass-backdrop--${e}`, !t && "glass-backdrop--still", i !== "none" && `glass-backdrop--${i}`, a && "glass-backdrop--fixed", o),
	style: {
		...n !== void 0 && { "--backdrop-speed": `${n}s` },
		...r !== void 0 && { "--backdrop-strength": r },
		...s
	},
	children: Array.from({ length: 6 }, (e, t) => /* @__PURE__ */ u("span", { className: "glass-backdrop__orb" }, t))
}), k = ({ as: e, variant: t = "secondary", size: n = "md", pressed: r, loading: i = !1, icon: a = !1, block: o = !1, className: s, children: c, ...f }) => {
	let m = e ?? "button";
	return /* @__PURE__ */ u(m, {
		type: m === "button" ? "button" : void 0,
		"aria-pressed": r,
		"aria-busy": i || void 0,
		className: p("glass-button", t !== "secondary" && `glass-button--${t}`, n !== "md" && `glass-button--${n}`, a && "glass-button--icon", o && "glass-button--block", s),
		...f,
		children: i ? /* @__PURE__ */ d(l, { children: [/* @__PURE__ */ u("span", {
			className: "glass-button__label",
			children: c
		}), /* @__PURE__ */ u("span", {
			className: "glass-spinner",
			"aria-hidden": "true"
		})] }) : c
	});
}, A = t(null), j = () => n(A), M = (e) => {
	let t = j(), n = e.invalid ?? t?.invalid;
	return {
		id: t?.id ?? e.id,
		required: e.required ?? t?.required,
		"aria-invalid": n || void 0,
		"aria-describedby": p(t?.describedBy, e["aria-describedby"]) || void 0
	};
}, N = ({ label: e, hint: t, error: n, required: r, optional: a, id: o, className: s, children: c }) => {
	let l = i(), f = o ?? `field-${l}`, m = t ? `${f}-hint` : void 0, h = n ? `${f}-error` : void 0;
	return /* @__PURE__ */ u(A.Provider, {
		value: {
			id: f,
			describedBy: p(m, h) || void 0,
			invalid: !!n,
			required: r
		},
		children: /* @__PURE__ */ d("div", {
			className: p("glass-field", s),
			children: [
				/* @__PURE__ */ d("label", {
					className: "glass-field__label",
					htmlFor: f,
					children: [e, a && /* @__PURE__ */ u("span", {
						className: "glass-field__optional",
						children: "Optional"
					})]
				}),
				c,
				t && /* @__PURE__ */ u("p", {
					id: m,
					className: "glass-field__hint",
					children: t
				}),
				n && /* @__PURE__ */ u("p", {
					id: h,
					className: "glass-field__error",
					children: n
				})
			]
		})
	});
}, P = (e, t) => t !== "md" && `${e}--${t}`, te = ({ size: e = "md", invalid: t, leading: n, trailing: r, className: i, style: a, ref: o, id: c, required: l, "aria-describedby": f, ...m }) => {
	let g = s(null), _ = h(g, o), v = M({
		id: c,
		invalid: t,
		required: l,
		"aria-describedby": f
	}), y = n != null || r != null, b = /* @__PURE__ */ u("input", {
		ref: _,
		className: p("glass-input", !y && P("glass-input", e), !y && i),
		style: y ? void 0 : a,
		...v,
		...m
	});
	return y ? /* @__PURE__ */ d("div", {
		className: p("glass-input-group", P("glass-input-group", e), i),
		style: a,
		onMouseDown: (e) => {
			e.target === g.current || e.target.closest("button, a, input, select, textarea") || (e.preventDefault(), g.current?.focus());
		},
		children: [
			n,
			b,
			r
		]
	}) : b;
}, F = ({ invalid: e, autoGrow: t = !1, className: n, id: r, required: i, "aria-describedby": a, ...o }) => {
	let s = M({
		id: r,
		invalid: e,
		required: i,
		"aria-describedby": a
	});
	return /* @__PURE__ */ u("textarea", {
		className: p("glass-input", t && "glass-input--auto", n),
		...s,
		...o
	});
}, I = ({ size: e = "md", invalid: t, className: n, id: r, required: i, "aria-describedby": a, ...o }) => {
	let s = M({
		id: r,
		invalid: t,
		required: i,
		"aria-describedby": a
	});
	return /* @__PURE__ */ u("select", {
		className: p("glass-input", P("glass-input", e), n),
		...s,
		...o
	});
}, L = (e, { label: t, description: n, wrapperClassName: r }) => t == null ? e : /* @__PURE__ */ d("label", {
	className: p("glass-check", r),
	children: [e, /* @__PURE__ */ d("span", {
		className: "glass-check__text",
		children: [/* @__PURE__ */ u("span", { children: t }), n != null && /* @__PURE__ */ u("span", {
			className: "glass-check__description",
			children: n
		})]
	})]
}), R = ({ label: e, description: t, invalid: n, wrapperClassName: r, indeterminate: i = !1, className: o, ref: c, ...l }) => {
	let d = s(null), f = h(d, c);
	return a(() => {
		d.current && (d.current.indeterminate = i);
	}, [i]), L(/* @__PURE__ */ u("input", {
		ref: f,
		type: "checkbox",
		"aria-invalid": n || void 0,
		className: p("glass-checkbox", o),
		...l
	}), {
		label: e,
		description: t,
		wrapperClassName: r
	});
}, z = ({ label: e, description: t, invalid: n, wrapperClassName: r, className: i, ...a }) => L(/* @__PURE__ */ u("input", {
	type: "radio",
	"aria-invalid": n || void 0,
	className: p("glass-checkbox", i),
	...a
}), {
	label: e,
	description: t,
	wrapperClassName: r
}), B = ({ checked: e, defaultChecked: t = !1, onChange: n, children: r, size: i = "md", block: a = !1, className: o, wrapperClassName: s, onClick: l, ...f }) => {
	let [m, h] = c(t), g = e ?? m, _ = /* @__PURE__ */ u("button", {
		type: "button",
		role: "switch",
		"aria-checked": g,
		className: p("glass-switch", i === "sm" && "glass-switch--sm", o),
		onClick: (t) => {
			l?.(t), !t.defaultPrevented && (e === void 0 && h(!g), n?.(!g));
		},
		...f,
		children: /* @__PURE__ */ u("span", {
			"aria-hidden": "true",
			className: "glass-switch__thumb"
		})
	});
	return r == null ? _ : /* @__PURE__ */ d("label", {
		className: p("glass-switch-row", a && "glass-switch-row--block", s),
		children: [/* @__PURE__ */ u("span", { children: r }), _]
	});
}, V = ({ value: e, defaultValue: t, onChange: n, min: r = 0, max: i = 100, step: a = 1, label: o, showValue: s = !0, format: l = String, className: f, wrapperClassName: m, style: h, ...g }) => {
	let [_, v] = c(t ?? r), y = e ?? _, b = i === r ? 0 : (y - r) / (i - r) * 100, x = /* @__PURE__ */ u("input", {
		type: "range",
		min: r,
		max: i,
		step: a,
		value: y,
		onChange: (t) => {
			let r = Number(t.target.value);
			e === void 0 && v(r), n?.(r);
		},
		className: p("glass-slider", f),
		style: {
			"--fill": `${b}%`,
			...h
		},
		...g
	});
	return o == null ? x : /* @__PURE__ */ d("label", {
		className: p("glass-slider-field", m),
		children: [/* @__PURE__ */ d("span", {
			className: "glass-slider-field__head",
			children: [/* @__PURE__ */ u("span", { children: o }), s && /* @__PURE__ */ u("span", {
				className: "glass-slider-field__value",
				children: l(y)
			})]
		}), x]
	});
}, H = (e, t) => {
	a(() => {
		let n = e.current;
		if (!n) return;
		let r = 0, i = () => {
			r = 0;
			let e = n.querySelector(`:scope > ${t}`);
			n.style.setProperty("--indicator-on", e ? "1" : "0"), e && (n.style.setProperty("--indicator-x", `${e.offsetLeft}px`), n.style.setProperty("--indicator-w", `${e.offsetWidth}px`));
		}, a = () => {
			r ||= requestAnimationFrame(i);
		};
		i();
		let o = requestAnimationFrame(() => {
			n.dataset.indicator = "ready";
		}), s = typeof ResizeObserver > "u" ? null : new ResizeObserver(a);
		s?.observe(n);
		for (let e of n.children) s?.observe(e);
		let c = new MutationObserver(a);
		return c.observe(n, {
			subtree: !0,
			childList: !0,
			attributes: !0,
			attributeFilter: [
				"aria-current",
				"aria-checked",
				"aria-selected",
				"aria-pressed"
			]
		}), document.fonts?.ready.then(a), () => {
			cancelAnimationFrame(r), cancelAnimationFrame(o), s?.disconnect(), c.disconnect(), delete n.dataset.indicator;
		};
	}, [e, t]);
}, U = {
	ArrowRight: 1,
	ArrowDown: 1,
	ArrowLeft: -1,
	ArrowUp: -1
}, W = (e) => typeof e == "string" ? {
	value: e,
	label: e
} : e, G = ({ options: e, value: t, onChange: n, size: r = "md", block: i = !1, className: a, "aria-label": o }) => {
	let c = s(null), l = e.map(W), f = Math.max(0, l.findIndex((e) => e.value === t));
	H(c, "[aria-checked=\"true\"]");
	let m = (e) => {
		let t = U[e.key];
		if (!t) return;
		e.preventDefault();
		let r = (f + t + l.length) % l.length;
		n(l[r].value), c.current?.querySelectorAll("[role=\"radio\"]")[r]?.focus();
	};
	return /* @__PURE__ */ d("div", {
		ref: c,
		role: "radiogroup",
		"aria-label": o,
		onKeyDown: m,
		className: p("glass-segmented", r === "sm" && "glass-segmented--sm", i && "glass-segmented--block", a),
		children: [/* @__PURE__ */ u("span", {
			"aria-hidden": "true",
			className: "glass-indicator"
		}), l.map((e, t) => /* @__PURE__ */ u("button", {
			type: "button",
			role: "radio",
			"aria-checked": t === f,
			tabIndex: t === f ? 0 : -1,
			className: "glass-segmented__option",
			onClick: () => n(e.value),
			children: e.label
		}, e.value))]
	});
}, K = ({ size: e = "sm", className: t, children: n, ref: r, ...i }) => {
	let a = s(null), o = h(a, r);
	return H(a, "[aria-current]:not([aria-current=\"false\"])"), /* @__PURE__ */ d("nav", {
		ref: o,
		className: p("glass-nav", e === "md" && "glass-nav--lg", t),
		...i,
		children: [/* @__PURE__ */ u("span", {
			"aria-hidden": "true",
			className: "glass-indicator"
		}), n]
	});
}, q = () => /* @__PURE__ */ u("svg", {
	viewBox: "0 0 20 20",
	fill: "none",
	"aria-hidden": "true",
	children: /* @__PURE__ */ u("path", {
		d: "M5.5 5.5l9 9M14.5 5.5l-9 9",
		stroke: "currentColor",
		strokeWidth: "1.6",
		strokeLinecap: "round"
	})
}), J = ({ open: e, onClose: t, title: n, description: a, footer: o, size: c = "md", dismissible: l = !0, className: f, children: m }) => {
	let h = s(null), g = i(), _ = n == null ? void 0 : `${g}-title`, v = a == null ? void 0 : `${g}-description`;
	return r(() => {
		let t = h.current;
		t && (e && !t.open && (t.showModal(), t.querySelector("[data-autofocus], .glass-dialog__body :is(input, select, textarea):not([disabled], [type=\"hidden\"])")?.focus()), !e && t.open && t.close());
	}, [e]), r(() => {
		let e = h.current;
		if (!e) return;
		let n = (e) => {
			e.preventDefault(), l && t();
		};
		return e.addEventListener("cancel", n), () => e.removeEventListener("cancel", n);
	}, [l, t]), /* @__PURE__ */ u("dialog", {
		ref: h,
		"aria-labelledby": _,
		"aria-describedby": v,
		className: p("glass-dialog", c !== "md" && `glass-dialog--${c}`, f),
		onClick: (e) => {
			l && e.target === e.currentTarget && t();
		},
		children: /* @__PURE__ */ d(T, {
			intensity: "strong",
			padding: "none",
			className: "glass-dialog__panel",
			children: [
				(n != null || l) && /* @__PURE__ */ d("header", {
					className: "glass-dialog__header",
					children: [/* @__PURE__ */ d("div", {
						className: "glass-dialog__heading",
						children: [n != null && /* @__PURE__ */ u("h2", {
							id: _,
							className: "glass-dialog__title",
							children: n
						}), a != null && /* @__PURE__ */ u("p", {
							id: v,
							className: "glass-dialog__description",
							children: a
						})]
					}), l && /* @__PURE__ */ u(k, {
						variant: "ghost",
						size: "sm",
						icon: !0,
						"aria-label": "Close",
						onClick: t,
						children: /* @__PURE__ */ u(q, {})
					})]
				}),
				m != null && /* @__PURE__ */ u("div", {
					className: "glass-dialog__body",
					children: m
				}),
				o != null && /* @__PURE__ */ u("footer", {
					className: "glass-dialog__footer",
					children: o
				})
			]
		})
	});
}, Y = 8, X = 8, ne = ({ trigger: t, children: n, placement: a = "bottom-start", padded: o = !1, onOpenChange: c, "aria-label": f, className: h }) => {
	let g = `glass-popover-${i().replace(/[^\w-]/g, "")}`, _ = s(null), v = s(null), y = s(c);
	r(() => {
		y.current = c;
	}), r(() => {
		let e = _.current;
		if (!e) return;
		let [t, n = "center"] = a.split("-"), r = (r = !1) => {
			let i = v.current?.getBoundingClientRect();
			if (!i) return;
			let { clientWidth: a, clientHeight: o } = document.documentElement, s = t === "top" !== r;
			Object.assign(e.style, {
				top: "",
				bottom: "",
				left: "",
				right: "",
				translate: ""
			}), s ? e.style.bottom = `${o - i.top + Y}px` : e.style.top = `${i.bottom + Y}px`, n === "start" ? e.style.left = `${i.left}px` : n === "end" ? e.style.right = `${a - i.right}px` : (e.style.left = `${i.left + i.width / 2}px`, e.style.translate = "-50% 0");
		}, i = () => {
			r();
			let { clientWidth: n, clientHeight: i } = document.documentElement, a = e.getBoundingClientRect(), o = v.current?.getBoundingClientRect();
			o && (a.bottom > i - X || a.top < X) && (t === "top" ? i - o.bottom - Y - X : o.top - Y - X) >= a.height && (r(!0), a = e.getBoundingClientRect()), (a.left < X || a.right > n - X) && Object.assign(e.style, {
				right: "",
				translate: "",
				left: `${Math.max(X, Math.min(a.left, n - X - a.width))}px`
			});
		}, o = (e) => {
			e.newState === "open" && r();
		}, s = (t) => {
			let n = t.newState === "open";
			y.current?.(n), n ? (i(), e.querySelector("[role=\"menuitem\"]")?.focus({ preventScroll: !0 }), window.addEventListener("scroll", i, {
				passive: !0,
				capture: !0
			}), window.addEventListener("resize", i)) : (window.removeEventListener("scroll", i, { capture: !0 }), window.removeEventListener("resize", i));
		};
		return e.addEventListener("beforetoggle", o), e.addEventListener("toggle", s), () => {
			e.removeEventListener("beforetoggle", o), e.removeEventListener("toggle", s), window.removeEventListener("scroll", i, { capture: !0 }), window.removeEventListener("resize", i);
		};
	}, [a]);
	let b = () => _.current?.hidePopover(), x = t.props;
	return /* @__PURE__ */ d(l, { children: [e(t, {
		popoverTarget: g,
		ref: m(x.ref, v)
	}), /* @__PURE__ */ u(T, {
		ref: _,
		id: g,
		popover: "auto",
		"aria-label": f,
		intensity: "strong",
		padding: "none",
		radius: "card",
		className: p("glass-popover", o && "glass-popover--padded", h),
		children: typeof n == "function" ? n(b) : n
	})] });
}, Z = "[role=\"menuitem\"]:not([disabled]):not([aria-disabled=\"true\"])", re = ({ className: e, onKeyDown: t, ...n }) => /* @__PURE__ */ u("div", {
	role: "menu",
	className: p("glass-menu", e),
	onKeyDown: (e) => {
		t?.(e);
		let n = [...e.currentTarget.querySelectorAll(Z)];
		if (!n.length || ![
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) return;
		e.preventDefault();
		let r = n.indexOf(document.activeElement);
		n[{
			ArrowDown: (r + 1) % n.length,
			ArrowUp: (r - 1 + n.length) % n.length,
			Home: 0,
			End: n.length - 1
		}[e.key]]?.focus();
	},
	...n
}), ie = ({ as: e, icon: t, hint: n, danger: r = !1, className: i, children: a, ...o }) => {
	let s = e ?? "button";
	return /* @__PURE__ */ d(s, {
		role: "menuitem",
		type: s === "button" ? "button" : void 0,
		className: p("glass-menu__item", r && "glass-menu__item--danger", i),
		...o,
		children: [
			t,
			/* @__PURE__ */ u("span", { children: a }),
			n != null && /* @__PURE__ */ u("span", {
				className: "glass-menu__hint",
				children: n
			})
		]
	});
}, ae = (e) => e.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0].toUpperCase()).join(""), oe = (e) => [...e].reduce((e, t) => (e * 31 + t.charCodeAt(0)) % 360, 7), se = ({ name: e, src: t, size: n = "md", className: r, style: i, ...a }) => /* @__PURE__ */ u("span", {
	role: t ? void 0 : "img",
	"aria-label": t ? void 0 : e,
	className: p("glass-avatar", n !== "md" && `glass-avatar--${n}`, r),
	style: {
		"--avatar-hue": oe(e),
		...i
	},
	...a,
	children: t ? /* @__PURE__ */ u("img", {
		src: t,
		alt: e
	}) : ae(e)
}), ce = ({ tone: e = "neutral", dot: t = !1, className: n, children: r, ...i }) => /* @__PURE__ */ d("span", {
	className: p("glass-badge", `glass-badge--${e}`, n),
	...i,
	children: [t && /* @__PURE__ */ u("span", {
		"aria-hidden": "true",
		className: "glass-badge__dot"
	}), r]
}), le = ({ className: e, ...t }) => /* @__PURE__ */ u("kbd", {
	className: p("glass-kbd", e),
	...t
}), ue = ({ label: e, orientation: t = "horizontal", className: n }) => t === "vertical" ? /* @__PURE__ */ u("div", {
	role: "separator",
	"aria-orientation": "vertical",
	className: p("glass-divider glass-divider--vertical", n)
}) : e == null ? /* @__PURE__ */ u("hr", { className: p("glass-divider", n) }) : /* @__PURE__ */ u("div", {
	role: "separator",
	className: p("glass-divider glass-divider--labelled", n),
	children: e
}), de = {
	success: "M5 10.5l3.2 3.2L15 7",
	error: "M6.5 6.5l7 7M13.5 6.5l-7 7",
	info: "M10 6v.5M10 9.5V14"
}, fe = ({ open: e, onClose: t, duration: n = 4500, tone: i = "success", action: a, className: o, children: s }) => {
	r(() => {
		if (!e || !n || !t) return;
		let r = setTimeout(t, n);
		return () => clearTimeout(r);
	}, [
		e,
		n,
		t
	]);
	let c = /* @__PURE__ */ d("div", {
		role: i === "error" ? "alert" : "status",
		"aria-live": i === "error" ? "assertive" : "polite",
		"data-open": e,
		className: p("glass-toast", i !== "success" && `glass-toast--${i}`, o),
		children: [
			/* @__PURE__ */ u("span", {
				className: "glass-toast__icon",
				"aria-hidden": "true",
				children: /* @__PURE__ */ u("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 20 20",
					fill: "none",
					children: /* @__PURE__ */ u("path", {
						d: de[i],
						stroke: "currentColor",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}),
			/* @__PURE__ */ u("span", {
				className: "glass-toast__message",
				children: e ? s : null
			}),
			e && a && /* @__PURE__ */ u("span", {
				className: "glass-toast__action",
				children: a
			})
		]
	});
	return typeof document > "u" ? c : f(c, document.body);
}, Q = (e, t, n) => ({
	...e !== void 0 && { "--glass-gap": g(e) },
	...Object.fromEntries(Object.entries(n ?? {}).filter(([, e]) => e !== void 0)),
	...t
}), pe = ({ as: e, width: t = "default", className: n, ...r }) => /* @__PURE__ */ u(e ?? "div", {
	className: p("glass-container", t !== "default" && `glass-container--${t}`, n),
	...r
}), $ = ({ as: e, gap: t, className: n, style: r, ...i }) => /* @__PURE__ */ u(e ?? "div", {
	className: p("glass-stack", n),
	style: Q(t, r),
	...i
}), me = {
	start: void 0,
	center: "center",
	end: "flex-end",
	between: "space-between"
}, he = ({ as: e, gap: t, justify: n = "start", className: r, style: i, ...a }) => /* @__PURE__ */ u(e ?? "div", {
	className: p("glass-cluster", r),
	style: Q(t, {
		justifyContent: me[n],
		...i
	}),
	...a
}), ge = ({ as: e, gap: t, min: n, className: r, style: i, ...a }) => /* @__PURE__ */ u(e ?? "div", {
	className: p("glass-grid", r),
	style: Q(t, i, { "--glass-min": n }),
	...a
}), _e = ({ as: e, gap: t, side: n, sideAt: r = "start", className: i, style: a, ...o }) => /* @__PURE__ */ u(e ?? "div", {
	className: p("glass-split", r === "end" && "glass-split--end", i),
	style: Q(t, a, { "--glass-side": n }),
	...o
});
//#endregion
export { _ as GLASS_DEFAULTS, E as GLASS_PALETTES, S as GLASS_REST, D as GLASS_TEXTURES, se as GlassAvatar, O as GlassBackdrop, ce as GlassBadge, k as GlassButton, R as GlassCheckbox, he as GlassCluster, pe as GlassContainer, J as GlassDialog, ue as GlassDivider, N as GlassField, ge as GlassGrid, te as GlassInput, le as GlassKbd, re as GlassMenu, ie as GlassMenuItem, K as GlassNav, T as GlassPanel, ne as GlassPopover, x as GlassProvider, z as GlassRadio, G as GlassSegmented, I as GlassSelect, V as GlassSlider, _e as GlassSplit, $ as GlassStack, B as GlassSwitch, F as GlassTextarea, fe as GlassToast, p as cx, b as glassVars, ee as useGlass, j as useGlassField, H as useGlassIndicator, C as useGlassPointer, w as useGlassReveal };
