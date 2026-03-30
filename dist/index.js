import e, { createContext as t, useContext as n, useMemo as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/context/GlassContext.tsx
var s = {
	blur: 40,
	opacity: .66,
	lightAlpha: .22,
	shadowAlpha: .2
}, c = t(s);
function l({ children: e, blur: t, opacity: i, lightAlpha: o, shadowAlpha: s }) {
	let l = n(c), u = r(() => ({
		blur: t ?? l.blur,
		opacity: i ?? l.opacity,
		lightAlpha: o ?? l.lightAlpha,
		shadowAlpha: s ?? l.shadowAlpha
	}), [
		t,
		i,
		o,
		s,
		l
	]);
	return /* @__PURE__ */ a(c.Provider, {
		value: u,
		children: e
	});
}
function u() {
	return n(c);
}
//#endregion
//#region src/glass.ts
var d = s.opacity, f = s.blur, p = s.lightAlpha, m = s.shadowAlpha, h = {
	subtle: .17,
	medium: .3,
	strong: .64
}, g = {
	subtle: .2,
	medium: .32,
	strong: .44
}, _ = {
	subtle: .24,
	medium: .38,
	strong: .64
}, v = {
	subtle: .2,
	medium: .34,
	strong: .46
}, y = {
	subtle: .07,
	medium: .1,
	strong: .13
}, b = {
	subtle: 96,
	medium: 120,
	strong: 108
}, x = "0.20 0.024 254", S = "0.48 0.06 248", C = "0.82 0.1  230", w = "0.05 0.015 250", T = "0.52 0.24 238", E = "0.58 0.14 210", D = Math.round(.512 * s.opacity * 1e3) / 1e3;
function O(e = "medium", t = s) {
	let { blur: n, opacity: r } = t, i = b[e];
	function a(e) {
		return (Math.round(e * r * 1e3) / 1e3).toFixed(3);
	}
	return {
		panel: {
			background: `oklch(${x} / ${a(h[e])})`,
			backdropFilter: `blur(${n}px)`,
			border: `1px solid oklch(${S} / ${a(g[e])})`,
			boxShadow: [`0 8px 40px oklch(${w} / ${a(v[e])})`, `inset 0 1px 0 oklch(${C} / ${a(_[e] * .55)})`].join(", ")
		},
		shimmerColor: `oklch(${C} / ${a(_[e])})`,
		topRightGlow: {
			background: `radial-gradient(circle, oklch(${T} / ${a(y[e])}) 0%, transparent 70%)`,
			filter: `blur(${i}px)`
		},
		bottomLeftGlow: {
			background: `radial-gradient(circle, oklch(${E} / ${a(y[e] * .75)}) 0%, transparent 70%)`,
			filter: `blur(${Math.round(i * .9)}px)`
		}
	};
}
//#endregion
//#region src/patterns.ts
var k = (e) => `data:image/svg+xml,${encodeURIComponent(e.trim())}`, A = [
	{
		id: "none",
		label: "None",
		swatch: "transparent",
		url: "",
		size: ""
	},
	{
		id: "grid",
		label: "Grid",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M 20 0 L 0 0 0 20' fill='none' stroke='white' stroke-width='0.5' opacity='0.6'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><path d='M 32 0 L 0 0 0 32' fill='none' stroke='white' stroke-width='0.6'/></svg>"),
		size: "32px 32px"
	},
	{
		id: "dots",
		label: "Dots",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><circle cx='6' cy='6' r='1.5' fill='white' opacity='0.6'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18'><circle cx='9' cy='9' r='1.5' fill='white'/></svg>"),
		size: "18px 18px"
	},
	{
		id: "crosshatch",
		label: "Hatch",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M 0 16 L 16 0 M 0 0 L 16 16' stroke='white' stroke-width='0.7' opacity='0.5'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M 0 20 L 20 0 M 0 0 L 20 20' stroke='white' stroke-width='0.7'/></svg>"),
		size: "20px 20px"
	},
	{
		id: "diagonal",
		label: "Lines",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M 0 12 L 12 0' stroke='white' stroke-width='0.7' opacity='0.5'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M 0 16 L 16 0' stroke='white' stroke-width='0.7'/></svg>"),
		size: "16px 16px"
	},
	{
		id: "diamond",
		label: "Diamond",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M 10 1 L 19 10 10 19 1 10 Z' fill='none' stroke='white' stroke-width='0.7' opacity='0.5'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><path d='M 14 1 L 27 14 14 27 1 14 Z' fill='none' stroke='white' stroke-width='0.6'/></svg>"),
		size: "28px 28px"
	},
	{
		id: "hex",
		label: "Hex",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='26' height='22'><polygon points='13,1 24,7 24,15 13,21 2,15 2,7' fill='none' stroke='white' stroke-width='0.7' opacity='0.5'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='40' height='34'><polygon points='20,2 37,11 37,23 20,32 3,23 3,11' fill='none' stroke='white' stroke-width='0.6'/></svg>"),
		size: "40px 34px"
	},
	{
		id: "grid-sm",
		label: "Fine Grid",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M 16 0 L 0 0 0 16' fill='none' stroke='white' stroke-width='0.4' opacity='0.6'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M 16 0 L 0 0 0 16' fill='none' stroke='white' stroke-width='0.4'/></svg>"),
		size: "16px 16px"
	},
	{
		id: "dots-sm",
		label: "Fine Dots",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='0.7' fill='white' opacity='0.6'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='0.7' fill='white'/></svg>"),
		size: "10px 10px"
	},
	{
		id: "grain",
		label: "Grain",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='24' height='24' filter='url(#g)'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='256' height='256' filter='url(#g)'/></svg>"),
		size: "256px 256px"
	},
	{
		id: "noise",
		label: "Noise",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.25' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='24' height='24' filter='url(#n)'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.25' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='256' height='256' filter='url(#n)'/></svg>"),
		size: "256px 256px"
	},
	{
		id: "turbulence",
		label: "Turbulence",
		swatch: k("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><filter id='t'><feTurbulence type='turbulence' baseFrequency='0.02' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='24' height='24' filter='url(#t)'/></svg>"),
		url: k("<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='t'><feTurbulence type='turbulence' baseFrequency='0.02' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='256' height='256' filter='url(#t)'/></svg>"),
		size: "256px 256px"
	}
], j = [
	{
		id: "night",
		label: "Night",
		swatch: "linear-gradient(135deg, oklch(0.20 0.06 240), oklch(0.12 0.04 260))",
		gradient: "\n      radial-gradient(circle at 14% 18%, oklch(0.42 0.24 216 / 0.26), transparent 26%),\n      radial-gradient(circle at 88% 10%, oklch(0.50 0.28 206 / 0.28), transparent 24%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.11 0.08 248 / 0.94), transparent 100%),\n      linear-gradient(180deg, oklch(0.12 0.030 246) 0%, oklch(0.07 0.05 250) 100%)\n    "
	},
	{
		id: "ember",
		label: "Ember",
		swatch: "linear-gradient(135deg, oklch(0.22 0.08 28), oklch(0.10 0.04 15))",
		gradient: "\n      radial-gradient(circle at 18% 15%, oklch(0.48 0.22 38 / 0.30), transparent 32%),\n      radial-gradient(circle at 82% 72%, oklch(0.40 0.20 18 / 0.28), transparent 36%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.10 0.06 22 / 0.92), transparent 100%),\n      linear-gradient(180deg, oklch(0.11 0.028 28) 0%, oklch(0.06 0.016 18) 100%)\n    "
	},
	{
		id: "forest",
		label: "Forest",
		swatch: "linear-gradient(135deg, oklch(0.20 0.07 155), oklch(0.09 0.03 165))",
		gradient: "\n      radial-gradient(circle at 25% 35%, oklch(0.44 0.20 155 / 0.28), transparent 34%),\n      radial-gradient(circle at 78% 15%, oklch(0.38 0.16 175 / 0.24), transparent 30%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.09 0.06 160 / 0.94), transparent 100%),\n      linear-gradient(180deg, oklch(0.11 0.032 152) 0%, oklch(0.06 0.018 162) 100%)\n    "
	},
	{
		id: "dusk",
		label: "Dusk",
		swatch: "linear-gradient(135deg, oklch(0.22 0.09 290), oklch(0.10 0.04 310))",
		gradient: "\n      radial-gradient(circle at 65% 8%, oklch(0.52 0.24 292 / 0.30), transparent 34%),\n      radial-gradient(circle at 12% 75%, oklch(0.42 0.20 322 / 0.26), transparent 36%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.10 0.07 300 / 0.92), transparent 100%),\n      linear-gradient(180deg, oklch(0.11 0.030 285) 0%, oklch(0.07 0.022 305) 100%)\n    "
	},
	{
		id: "dawn",
		label: "Dawn",
		swatch: "linear-gradient(135deg, oklch(0.94 0.04 80), oklch(0.82 0.06 45))",
		gradient: "\n      radial-gradient(circle at 22% 20%, oklch(0.90 0.08 72 / 0.40), transparent 38%),\n      radial-gradient(circle at 80% 60%, oklch(0.78 0.10 42 / 0.28), transparent 40%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.72 0.06 50 / 0.50), transparent 100%),\n      linear-gradient(180deg, oklch(0.95 0.014 78) 0%, oklch(0.86 0.022 55) 100%)\n    "
	},
	{
		id: "aurora",
		label: "Aurora",
		swatch: "linear-gradient(135deg, oklch(0.28 0.16 185), oklch(0.16 0.10 320))",
		gradient: "\n      radial-gradient(circle at 12% 20%, oklch(0.52 0.22 185 / 0.30), transparent 32%),\n      radial-gradient(circle at 85% 15%, oklch(0.48 0.24 320 / 0.26), transparent 36%),\n      radial-gradient(circle at 48% 75%, oklch(0.36 0.18 268 / 0.22), transparent 40%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.09 0.07 230 / 0.94), transparent 100%),\n      linear-gradient(180deg, oklch(0.09 0.024 215) 0%, oklch(0.05 0.018 240) 100%)\n    "
	},
	{
		id: "nebula",
		label: "Nebula",
		swatch: "linear-gradient(135deg, oklch(0.20 0.10 268), oklch(0.20 0.10 48))",
		gradient: "\n      radial-gradient(circle at 78% 12%, oklch(0.58 0.20 52 / 0.28), transparent 30%),\n      radial-gradient(circle at 14% 58%, oklch(0.46 0.24 278 / 0.30), transparent 38%),\n      radial-gradient(circle at 68% 76%, oklch(0.38 0.18 250 / 0.22), transparent 34%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.09 0.07 268 / 0.94), transparent 100%),\n      linear-gradient(180deg, oklch(0.10 0.030 262) 0%, oklch(0.06 0.020 278) 100%)\n    "
	},
	{
		id: "lagoon",
		label: "Lagoon",
		swatch: "linear-gradient(135deg, oklch(0.22 0.09 195), oklch(0.10 0.05 238))",
		gradient: "\n      radial-gradient(circle at 20% 18%, oklch(0.56 0.18 192 / 0.28), transparent 30%),\n      radial-gradient(circle at 78% 22%, oklch(0.42 0.14 175 / 0.22), transparent 28%),\n      radial-gradient(circle at 54% 80%, oklch(0.36 0.20 240 / 0.26), transparent 40%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.08 0.06 212 / 0.94), transparent 100%),\n      linear-gradient(180deg, oklch(0.10 0.028 205) 0%, oklch(0.05 0.020 230) 100%)\n    "
	},
	{
		id: "crimson",
		label: "Crimson",
		swatch: "linear-gradient(135deg, oklch(0.22 0.10 18), oklch(0.12 0.06 348))",
		gradient: "\n      radial-gradient(circle at 25% 12%, oklch(0.52 0.24 18 / 0.30), transparent 32%),\n      radial-gradient(circle at 80% 55%, oklch(0.46 0.20 350 / 0.26), transparent 36%),\n      radial-gradient(circle at 15% 76%, oklch(0.38 0.16 330 / 0.20), transparent 30%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.09 0.06 14 / 0.94), transparent 100%),\n      linear-gradient(180deg, oklch(0.10 0.028 14) 0%, oklch(0.06 0.018 350) 100%)\n    "
	},
	{
		id: "solstice",
		label: "Solstice",
		swatch: "linear-gradient(135deg, oklch(0.24 0.08 58), oklch(0.14 0.07 188))",
		gradient: "\n      radial-gradient(circle at 75% 15%, oklch(0.60 0.20 60 / 0.28), transparent 34%),\n      radial-gradient(circle at 18% 65%, oklch(0.50 0.22 190 / 0.28), transparent 38%),\n      radial-gradient(circle at 50% 45%, oklch(0.32 0.08 122 / 0.14), transparent 40%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.09 0.04 100 / 0.94), transparent 100%),\n      linear-gradient(180deg, oklch(0.10 0.022 80) 0%, oklch(0.06 0.020 195) 100%)\n    "
	},
	{
		id: "veil",
		label: "Veil",
		swatch: "linear-gradient(135deg, oklch(0.22 0.09 295), oklch(0.14 0.07 350))",
		gradient: "\n      radial-gradient(circle at 22% 18%, oklch(0.52 0.18 352 / 0.28), transparent 34%),\n      radial-gradient(circle at 78% 22%, oklch(0.48 0.20 302 / 0.26), transparent 32%),\n      radial-gradient(circle at 45% 72%, oklch(0.38 0.18 270 / 0.24), transparent 38%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.10 0.07 290 / 0.94), transparent 100%),\n      linear-gradient(180deg, oklch(0.11 0.030 285) 0%, oklch(0.06 0.024 308) 100%)\n    "
	},
	{
		id: "sunset",
		label: "Sunset",
		swatch: "linear-gradient(135deg, oklch(0.26 0.12 36), oklch(0.14 0.08 292))",
		gradient: "\n      radial-gradient(circle at 50% 8%, oklch(0.62 0.22 42 / 0.30), transparent 40%),\n      radial-gradient(circle at 15% 52%, oklch(0.44 0.22 295 / 0.26), transparent 36%),\n      radial-gradient(circle at 85% 45%, oklch(0.40 0.20 22 / 0.24), transparent 30%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.10 0.07 278 / 0.94), transparent 100%),\n      linear-gradient(180deg, oklch(0.11 0.030 30) 0%, oklch(0.06 0.022 285) 100%)\n    "
	},
	{
		id: "abyss",
		label: "Abyss",
		swatch: "linear-gradient(135deg, oklch(0.12 0.04 245), oklch(0.05 0.02 255))",
		gradient: "\n      radial-gradient(circle at 30% 20%, oklch(0.34 0.10 238 / 0.22), transparent 36%),\n      radial-gradient(circle at 72% 68%, oklch(0.26 0.08 258 / 0.18), transparent 32%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.07 0.04 248 / 0.96), transparent 100%),\n      linear-gradient(180deg, oklch(0.07 0.018 244) 0%, oklch(0.04 0.012 252) 100%)\n    "
	}
];
function M(e, t) {
	let n = +(.28 * t).toFixed(2), r = +(.24 * t).toFixed(2), i = (e + 20) % 360;
	return `
    radial-gradient(circle at 20% 15%, oklch(0.44 0.22 ${e} / ${n}), transparent 32%),
    radial-gradient(circle at 80% 70%, oklch(0.38 0.18 ${i} / ${r}), transparent 36%),
    radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.11 0.07 ${e} / 0.92), transparent 100%),
    linear-gradient(180deg, oklch(0.11 0.030 ${e}) 0%, oklch(0.06 0.018 ${i}) 100%)
  `;
}
//#endregion
//#region src/components/GlassPanel.tsx
var N = ({ intensity: e = "medium", topGlow: t = !0, bottomGlow: n = !1, rounded: r = "rounded-[2.2rem]", className: s = "", style: c, children: l, as: d = "div", ...f }) => {
	let p = u(), m = O(e, p), [h, g] = i({
		x: 50,
		y: 30
	}), [_, v] = i(!1), y = (e) => {
		let t = e.currentTarget.getBoundingClientRect();
		g({
			x: (e.clientX - t.left) / t.width * 100,
			y: (e.clientY - t.top) / t.height * 100
		});
	};
	return /* @__PURE__ */ o(d, {
		className: `relative overflow-hidden ${r} ${s}`,
		style: {
			...m.panel,
			...c
		},
		onMouseMove: y,
		onMouseEnter: () => v(!0),
		onMouseLeave: () => v(!1),
		...f,
		children: [
			/* @__PURE__ */ a("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-x-0 top-0 h-px",
				style: { background: `linear-gradient(90deg, transparent, ${m.shimmerColor}, transparent)` }
			}),
			/* @__PURE__ */ a("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 transition-opacity duration-500",
				style: {
					background: `radial-gradient(ellipse 160% 130% at ${100 - h.x}% ${100 - h.y}%, oklch(0.04 0.01 255 / ${p.shadowAlpha}) 0%, transparent 58%)`,
					opacity: _ ? 1 : 0
				}
			}),
			/* @__PURE__ */ a("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 transition-opacity duration-500",
				style: {
					background: `radial-gradient(ellipse 190% 150% at ${h.x}% ${h.y}%, oklch(0.28 0.05 215 / ${p.lightAlpha}) 0%, transparent 55%)`,
					mixBlendMode: "screen",
					opacity: _ ? 1 : 0
				}
			}),
			t && /* @__PURE__ */ a("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute right-[-4rem] top-[-12rem] h-[28rem] w-[58rem] rounded-full",
				style: m.topRightGlow
			}),
			n && /* @__PURE__ */ a("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute bottom-[-5rem] left-[-5rem] h-72 w-72 rounded-full",
				style: m.bottomLeftGlow
			}),
			l
		]
	});
}, P = {
	xs: "gap-1.5 px-3 py-1 text-[0.60rem] tracking-[0.20em]",
	sm: "gap-2 px-4 py-2 text-[0.68rem] tracking-[0.24em]",
	md: "gap-2 px-5 py-2.5 text-[0.68rem] tracking-[0.24em]",
	lg: "gap-2 px-6 py-3.5 text-[0.72rem] tracking-[0.24em]"
}, F = {
	default: ["border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]", "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"].join(" "),
	active: "border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] text-[var(--color-text)]",
	accent: ["border-[oklch(0.62_0.16_240_/_0.5)] bg-[oklch(0.62_0.16_240_/_0.10)] text-[var(--color-accent-bright)]", "hover:bg-[oklch(0.62_0.16_240_/_0.18)]"].join(" ")
}, I = [
	"inline-flex items-center rounded-full border font-semibold uppercase",
	"text-bevel backdrop-blur-md",
	"transition duration-300 ease-out",
	"hover:-translate-y-0.5",
	"focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-soft)]",
	"disabled:opacity-30 disabled:pointer-events-none"
].join(" "), L = ({ size: e = "md", variant: t = "default", as: n = "button", className: r = "", children: i, ...o }) => {
	let s = n === "button" && !o.type ? { type: "button" } : {};
	return /* @__PURE__ */ a(n, {
		className: `${I} ${P[e]} ${F[t]} ${r}`,
		...s,
		...o,
		children: i
	});
}, R = ({ className: e = "" }) => /* @__PURE__ */ a("div", {
	"aria-hidden": "true",
	className: `h-px w-full bg-gradient-to-r from-transparent via-[oklch(0.48_0.06_248_/_0.30)] to-transparent ${e}`
}), z = "0.48 0.06 248", B = "0.69 0.13 240", V = "0.82 0.1  230", H = "0.52 0.24 238", U = "0.72 0.14 236", W = "0.18 0.022 254", G = "0.22 0.026 250", K = ({ children: e, focused: t, fieldBlur: n = 16, radius: r = "1.4rem", wrapperClassName: s = "", wrapperStyle: c, shimmer: l = !0 }) => {
	let [d, f] = i(!1), p = t ?? d, { opacity: m } = u();
	function h(e) {
		return Math.round(e * m * 1e3) / 1e3;
	}
	return /* @__PURE__ */ o("div", {
		className: s,
		style: {
			position: "relative",
			borderRadius: r,
			backdropFilter: `blur(${n}px)`,
			background: p ? `oklch(${G} / ${h(.6)})` : `oklch(${W}  / ${h(.42)})`,
			border: `1px solid oklch(${p ? B : z} / ${p ? .55 : .28})`,
			boxShadow: p ? [
				`0 0 0 3px oklch(${U} / 0.14)`,
				`0 0 28px oklch(${H} / 0.12)`,
				...l ? [] : [`inset 0 1px 0 oklch(${V} / 0.18)`]
			].join(", ") : l ? "none" : `inset 0 1px 0 oklch(${V} / 0.10)`,
			transition: "border-color 300ms ease-out, box-shadow 300ms ease-out, background 300ms ease-out",
			...c
		},
		onFocus: () => {
			t === void 0 && f(!0);
		},
		onBlur: () => {
			t === void 0 && f(!1);
		},
		children: [l && /* @__PURE__ */ a("div", {
			"aria-hidden": "true",
			style: {
				position: "absolute",
				top: 0,
				left: "10%",
				right: "10%",
				height: "1px",
				pointerEvents: "none",
				background: `linear-gradient(90deg, transparent, oklch(${V} / 0.22), transparent)`
			}
		}), e]
	});
}, q = e.forwardRef(({ fieldBlur: e, wrapperClassName: t, wrapperStyle: n, shimmer: r, onFocus: o, onBlur: s, className: c, ...l }, u) => {
	let [d, f] = i(!1);
	return /* @__PURE__ */ a(K, {
		focused: d,
		fieldBlur: e,
		wrapperClassName: t,
		wrapperStyle: n,
		shimmer: r,
		children: /* @__PURE__ */ a("input", {
			ref: u,
			...l,
			className: `block w-full appearance-none bg-transparent px-5 py-4 text-base leading-normal text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none ${c ?? ""}`,
			onFocus: (e) => {
				f(!0), o?.(e);
			},
			onBlur: (e) => {
				f(!1), s?.(e);
			}
		})
	});
});
q.displayName = "GlassInput";
var J = ({ fieldBlur: e, wrapperClassName: t, wrapperStyle: n, shimmer: r, onFocus: o, onBlur: s, className: c, ...l }) => {
	let [u, d] = i(!1);
	return /* @__PURE__ */ a(K, {
		focused: u,
		fieldBlur: e,
		radius: "1.6rem",
		wrapperClassName: t,
		wrapperStyle: n,
		shimmer: r,
		children: /* @__PURE__ */ a("textarea", {
			...l,
			className: `block w-full appearance-none bg-transparent px-5 py-4 text-base leading-7 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none resize-none ${c ?? ""}`,
			onFocus: (e) => {
				d(!0), o?.(e);
			},
			onBlur: (e) => {
				d(!1), s?.(e);
			}
		})
	});
};
//#endregion
export { j as BG_PRESETS, D as CARD_BG_ALPHA, f as GLASS_BLUR, s as GLASS_DEFAULTS, p as GLASS_LIGHT_ALPHA, d as GLASS_OPACITY, m as GLASS_SHADOW_ALPHA, E as GLOW_BL, T as GLOW_TR, R as GlassDivider, q as GlassInput, K as GlassInputWrap, N as GlassPanel, L as GlassPill, l as GlassProvider, J as GlassTextarea, A as PATTERNS, O as getGlassStyles, M as makeHueGradient, u as useGlass };
