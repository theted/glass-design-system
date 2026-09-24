import e, { createContext as t, useCallback as n, useContext as r, useEffect as i, useLayoutEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/context/GlassContext.tsx
var d = {
	blur: 40,
	opacity: .66,
	lightAlpha: .22,
	shadowAlpha: .2
}, f = t(d);
function p({ children: e, blur: t, opacity: n, lightAlpha: i, shadowAlpha: a }) {
	let s = r(f), c = o(() => ({
		blur: t ?? s.blur,
		opacity: n ?? s.opacity,
		lightAlpha: i ?? s.lightAlpha,
		shadowAlpha: a ?? s.shadowAlpha
	}), [
		t,
		n,
		i,
		a,
		s
	]);
	return /* @__PURE__ */ l(f.Provider, {
		value: c,
		children: e
	});
}
function m() {
	return r(f);
}
//#endregion
//#region src/glass.ts
var h = d.opacity, g = d.blur, _ = d.lightAlpha, v = d.shadowAlpha, y = {
	subtle: .17,
	medium: .3,
	strong: .64
}, b = {
	subtle: .2,
	medium: .32,
	strong: .44
}, x = {
	subtle: .24,
	medium: .38,
	strong: .64
}, S = {
	subtle: .2,
	medium: .34,
	strong: .46
}, C = {
	subtle: .06,
	medium: .09,
	strong: .12
}, w = {
	subtle: 1.35,
	medium: 1.5,
	strong: 1.6
}, T = "0.21 0.034 260", E = "0.52 0.05 255", D = "0.93 0.07 80", O = "0.05 0.02 262", k = "0.80 0.12 72", A = "0.55 0.18 262", j = Math.round(.512 * d.opacity * 1e3) / 1e3;
function M(e = "medium", t = d) {
	let { blur: n, opacity: r } = t;
	function i(e) {
		return (Math.round(e * r * 1e3) / 1e3).toFixed(3);
	}
	return {
		panel: {
			background: `oklch(${T} / ${i(y[e])})`,
			backdropFilter: `blur(${n}px) saturate(${w[e]})`,
			border: `1px solid oklch(${E} / ${i(b[e])})`,
			boxShadow: [
				`0 1px 1px oklch(${O} / ${i(S[e] * .8)})`,
				`0 24px 64px -16px oklch(${O} / ${i(S[e] * 1.6)})`,
				`inset 0 1px 0 oklch(${D} / ${i(x[e] * .45)})`,
				`inset 0 -1px 0 oklch(${O} / ${i(S[e])})`
			].join(", ")
		},
		shimmerColor: `oklch(${D} / ${i(x[e])})`,
		topRightGlow: {
			background: `radial-gradient(closest-side, oklch(${k} / ${i(C[e])}) 0%, oklch(${k} / ${i(C[e] * .4)}) 45%, transparent 100%)`,
			filter: "none"
		},
		bottomLeftGlow: {
			background: `radial-gradient(closest-side, oklch(${A} / ${i(C[e] * 1.4)}) 0%, oklch(${A} / ${i(C[e] * .5)}) 45%, transparent 100%)`,
			filter: "none"
		}
	};
}
//#endregion
//#region src/hooks/useGlassPointer.ts
var N = 45;
function P(e, t = !0) {
	i(() => {
		let n = e.current;
		if (!n || !t) return;
		let r = 0, i = 45, a = null, o = (e) => {
			let t = ((e - i) % 360 + 540) % 360 - 180;
			i += t, n.style.setProperty("--glass-angle", `${i}deg`);
		}, s = () => {
			if (r = 0, !a) return;
			let { x: e, y: t } = a;
			a = null, n.style.setProperty("--glass-x", e.toFixed(4)), n.style.setProperty("--glass-y", t.toFixed(4)), o(Math.atan2(e - .5, .5 - t) * 180 / Math.PI);
		}, c = (e) => {
			if (e.pointerType === "touch") return;
			let t = n.getBoundingClientRect();
			a = {
				x: Math.min(1, Math.max(0, (e.clientX - t.left) / t.width)),
				y: Math.min(1, Math.max(0, (e.clientY - t.top) / t.height))
			}, r ||= requestAnimationFrame(s);
		}, l = (e) => {
			e.pointerType !== "touch" && (n.style.setProperty("--glass-hover", "1"), c(e));
		}, u = () => {
			a = null, n.style.setProperty("--glass-hover", "0"), o(45);
		};
		return n.addEventListener("pointerenter", l), n.addEventListener("pointermove", c), n.addEventListener("pointerleave", u), () => {
			cancelAnimationFrame(r), n.removeEventListener("pointerenter", l), n.removeEventListener("pointermove", c), n.removeEventListener("pointerleave", u);
		};
	}, [e, t]);
}
function F(e, t = !0) {
	a(() => {
		let n = e.current;
		if (!n || !t || typeof IntersectionObserver > "u") return;
		n.dataset.reveal = "pending";
		let r = new IntersectionObserver((e) => {
			for (let t of e) t.isIntersecting && (n.dataset.reveal = "in", r.disconnect());
		}, {
			rootMargin: "0px 0px -8% 0px",
			threshold: .08
		});
		return r.observe(n), () => r.disconnect();
	}, [e, t]);
}
//#endregion
//#region src/patterns.ts
var I = (e) => `data:image/svg+xml,${encodeURIComponent(e.trim())}`, L = [
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
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M 20 0 L 0 0 0 20' fill='none' stroke='white' stroke-width='0.5' opacity='0.6'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><path d='M 32 0 L 0 0 0 32' fill='none' stroke='white' stroke-width='0.6'/></svg>"),
		size: "32px 32px"
	},
	{
		id: "dots",
		label: "Dots",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><circle cx='6' cy='6' r='1.5' fill='white' opacity='0.6'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18'><circle cx='9' cy='9' r='1.5' fill='white'/></svg>"),
		size: "18px 18px"
	},
	{
		id: "crosshatch",
		label: "Hatch",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M 0 16 L 16 0 M 0 0 L 16 16' stroke='white' stroke-width='0.7' opacity='0.5'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M 0 20 L 20 0 M 0 0 L 20 20' stroke='white' stroke-width='0.7'/></svg>"),
		size: "20px 20px"
	},
	{
		id: "diagonal",
		label: "Lines",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><path d='M 0 12 L 12 0' stroke='white' stroke-width='0.7' opacity='0.5'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M 0 16 L 16 0' stroke='white' stroke-width='0.7'/></svg>"),
		size: "16px 16px"
	},
	{
		id: "diamond",
		label: "Diamond",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M 10 1 L 19 10 10 19 1 10 Z' fill='none' stroke='white' stroke-width='0.7' opacity='0.5'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><path d='M 14 1 L 27 14 14 27 1 14 Z' fill='none' stroke='white' stroke-width='0.6'/></svg>"),
		size: "28px 28px"
	},
	{
		id: "hex",
		label: "Hex",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='26' height='22'><polygon points='13,1 24,7 24,15 13,21 2,15 2,7' fill='none' stroke='white' stroke-width='0.7' opacity='0.5'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='40' height='34'><polygon points='20,2 37,11 37,23 20,32 3,23 3,11' fill='none' stroke='white' stroke-width='0.6'/></svg>"),
		size: "40px 34px"
	},
	{
		id: "grid-sm",
		label: "Fine Grid",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M 16 0 L 0 0 0 16' fill='none' stroke='white' stroke-width='0.4' opacity='0.6'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><path d='M 16 0 L 0 0 0 16' fill='none' stroke='white' stroke-width='0.4'/></svg>"),
		size: "16px 16px"
	},
	{
		id: "dots-sm",
		label: "Fine Dots",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='0.7' fill='white' opacity='0.6'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='0.7' fill='white'/></svg>"),
		size: "10px 10px"
	},
	{
		id: "grain",
		label: "Grain",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='24' height='24' filter='url(#g)'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='256' height='256' filter='url(#g)'/></svg>"),
		size: "256px 256px"
	},
	{
		id: "noise",
		label: "Noise",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.25' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='24' height='24' filter='url(#n)'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.25' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='256' height='256' filter='url(#n)'/></svg>"),
		size: "256px 256px"
	},
	{
		id: "turbulence",
		label: "Turbulence",
		swatch: I("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><filter id='t'><feTurbulence type='turbulence' baseFrequency='0.02' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='24' height='24' filter='url(#t)'/></svg>"),
		url: I("<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='t'><feTurbulence type='turbulence' baseFrequency='0.02' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='256' height='256' filter='url(#t)'/></svg>"),
		size: "256px 256px"
	}
], R = [
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
	},
	{
		id: "biolume",
		label: "Biolume",
		swatch: "linear-gradient(135deg, oklch(0.18 0.10 192), oklch(0.08 0.05 218))",
		gradient: "\n      radial-gradient(circle at 25% 25%, oklch(0.40 0.16 192 / 0.20), transparent 40%),\n      radial-gradient(circle at 72% 18%, oklch(0.36 0.14 175 / 0.16), transparent 36%),\n      radial-gradient(circle at 48% 74%, oklch(0.32 0.18 215 / 0.18), transparent 44%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.08 0.06 204 / 0.96), transparent 100%),\n      linear-gradient(180deg, oklch(0.09 0.022 196) 0%, oklch(0.05 0.016 218) 100%)\n    "
	},
	{
		id: "grove",
		label: "Grove",
		swatch: "linear-gradient(135deg, oklch(0.18 0.08 148), oklch(0.08 0.04 162))",
		gradient: "\n      radial-gradient(circle at 30% 22%, oklch(0.42 0.16 148 / 0.20), transparent 38%),\n      radial-gradient(circle at 68% 28%, oklch(0.36 0.14 164 / 0.16), transparent 34%),\n      radial-gradient(circle at 20% 74%, oklch(0.34 0.18 140 / 0.18), transparent 40%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.08 0.05 152 / 0.96), transparent 100%),\n      linear-gradient(180deg, oklch(0.09 0.020 145) 0%, oklch(0.05 0.014 160) 100%)\n    "
	},
	{
		id: "pelagic",
		label: "Pelagic",
		swatch: "linear-gradient(135deg, oklch(0.16 0.08 232), oklch(0.07 0.04 248))",
		gradient: "\n      radial-gradient(circle at 22% 18%, oklch(0.38 0.16 228 / 0.20), transparent 38%),\n      radial-gradient(circle at 78% 24%, oklch(0.32 0.14 248 / 0.16), transparent 34%),\n      radial-gradient(circle at 52% 78%, oklch(0.28 0.12 238 / 0.18), transparent 42%),\n      radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.07 0.05 240 / 0.97), transparent 100%),\n      linear-gradient(180deg, oklch(0.08 0.020 232) 0%, oklch(0.04 0.014 248) 100%)\n    "
	}
];
function z(e, t) {
	let n = +(.28 * t).toFixed(2), r = +(.24 * t).toFixed(2), i = (e + 20) % 360;
	return `
    radial-gradient(circle at 20% 15%, oklch(0.44 0.22 ${e} / ${n}), transparent 32%),
    radial-gradient(circle at 80% 70%, oklch(0.38 0.18 ${i} / ${r}), transparent 36%),
    radial-gradient(ellipse 100% 55% at 50% 100%, oklch(0.11 0.07 ${e} / 0.92), transparent 100%),
    linear-gradient(180deg, oklch(0.11 0.030 ${e}) 0%, oklch(0.06 0.018 ${i}) 100%)
  `;
}
//#endregion
//#region src/components/GlassOrbs.tsx
var B = ({ preset: e = "drift", speed: t = 6, opacity: n = .95, fixed: r = !1, blendMode: i = "screen", className: a = "" }) => {
	let o = {
		"--orb-speed": `${t}s`,
		"--orb-opacity": String(n),
		"--orb-blend": i
	};
	return /* @__PURE__ */ u("div", {
		"aria-hidden": "true",
		className: `glass-orbs glass-orbs--${e}${r ? " glass-orbs--fixed" : ""} ${a}`.trim(),
		style: o,
		children: [
			/* @__PURE__ */ l("div", { className: "glass-orb glass-orb-1" }),
			/* @__PURE__ */ l("div", { className: "glass-orb glass-orb-2" }),
			/* @__PURE__ */ l("div", { className: "glass-orb glass-orb-3" }),
			/* @__PURE__ */ l("div", { className: "glass-orb glass-orb-4" }),
			/* @__PURE__ */ l("div", { className: "glass-orb glass-orb-5" }),
			/* @__PURE__ */ l("div", { className: "glass-orb glass-orb-6" })
		]
	});
}, V = ({ intensity: e = "medium", topGlow: t = !0, bottomGlow: r = !1, rounded: i = "rounded-[2.2rem]", tilt: a = !1, reveal: o = !1, spectrum: c = !0, className: d = "", style: f, children: p, as: h = "div", ref: g, ..._ }) => {
	let v = m(), y = M(e, v), b = s(null);
	P(b), F(b, o);
	let x = n((e) => {
		b.current = e, typeof g == "function" ? g(e) : g && (g.current = e);
	}, [g]), S = [
		"glass-surface",
		a && "glass-surface--tilt",
		o && "glass-surface--reveal",
		i,
		d
	].filter(Boolean).join(" "), C = {
		"--glass-light-alpha": v.lightAlpha,
		"--glass-shadow-alpha": v.shadowAlpha
	};
	return /* @__PURE__ */ u(h, {
		ref: x,
		className: S,
		style: {
			...y.panel,
			...C,
			...f
		},
		..._,
		children: [
			/* @__PURE__ */ l("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-x-0 top-0 h-px",
				style: {
					background: `linear-gradient(90deg, transparent 5%, ${y.shimmerColor} 70%, transparent)`,
					zIndex: 1
				}
			}),
			/* @__PURE__ */ l("div", {
				"aria-hidden": "true",
				className: "glass-surface__shade"
			}),
			/* @__PURE__ */ l("div", {
				"aria-hidden": "true",
				className: "glass-surface__sheen"
			}),
			t && /* @__PURE__ */ l("div", {
				"aria-hidden": "true",
				className: "glass-surface__glow",
				style: {
					right: "-10rem",
					top: "-14rem",
					width: "44rem",
					height: "28rem",
					...y.topRightGlow
				}
			}),
			r && /* @__PURE__ */ l("div", {
				"aria-hidden": "true",
				className: "glass-surface__glow",
				style: {
					left: "-10rem",
					bottom: "-10rem",
					width: "28rem",
					height: "24rem",
					...y.bottomLeftGlow
				}
			}),
			/* @__PURE__ */ l("div", {
				"aria-hidden": "true",
				className: "glass-surface__rim"
			}),
			c && /* @__PURE__ */ l("div", {
				"aria-hidden": "true",
				className: "glass-surface__spectrum"
			}),
			p
		]
	});
}, H = "glass-pill", U = ({ size: e = "md", variant: t = "default", as: n = "button", className: r = "", children: i, ...a }) => {
	let o = n === "button" && !a.type ? { type: "button" } : {};
	return /* @__PURE__ */ l(n, {
		className: `${H} glass-pill--${e}${t === "default" ? "" : ` glass-pill--${t}`} ${r}`.trim(),
		...o,
		...a,
		children: i
	});
}, W = ({ className: e = "" }) => /* @__PURE__ */ l("div", {
	"aria-hidden": "true",
	className: `glass-divider ${e}`.trim()
}), G = ({ children: e, focused: t, fieldBlur: n = 16, radius: r = "1.1rem", wrapperClassName: i = "", wrapperStyle: a, shimmer: o = !0 }) => {
	let [s, d] = c(!1), f = t ?? s, { opacity: p } = m(), h = {
		"--field-radius": r,
		"--field-blur": `${n}px`,
		"--glass-opacity": p
	};
	return /* @__PURE__ */ u("div", {
		className: `glass-field ${i}`.trim(),
		"data-focused": f,
		style: {
			...h,
			...a
		},
		onFocus: () => {
			t === void 0 && d(!0);
		},
		onBlur: () => {
			t === void 0 && d(!1);
		},
		children: [o && /* @__PURE__ */ l("div", {
			"aria-hidden": "true",
			className: "glass-field__shimmer"
		}), e]
	});
}, K = e.forwardRef(({ fieldBlur: e, wrapperClassName: t, wrapperStyle: n, shimmer: r, onFocus: i, onBlur: a, className: o, ...s }, u) => {
	let [d, f] = c(!1);
	return /* @__PURE__ */ l(G, {
		focused: d,
		fieldBlur: e,
		wrapperClassName: t,
		wrapperStyle: n,
		shimmer: r,
		children: /* @__PURE__ */ l("input", {
			ref: u,
			...s,
			className: `glass-field__control ${o ?? ""}`.trim(),
			onFocus: (e) => {
				f(!0), i?.(e);
			},
			onBlur: (e) => {
				f(!1), a?.(e);
			}
		})
	});
});
K.displayName = "GlassInput";
var q = e.forwardRef(({ fieldBlur: e, wrapperClassName: t, wrapperStyle: n, shimmer: r, onFocus: i, onBlur: a, className: o, ...s }, u) => {
	let [d, f] = c(!1);
	return /* @__PURE__ */ l(G, {
		focused: d,
		fieldBlur: e,
		radius: "1.3rem",
		wrapperClassName: t,
		wrapperStyle: n,
		shimmer: r,
		children: /* @__PURE__ */ l("textarea", {
			ref: u,
			...s,
			className: `glass-field__control ${o ?? ""}`.trim(),
			onFocus: (e) => {
				f(!0), i?.(e);
			},
			onBlur: (e) => {
				f(!1), a?.(e);
			}
		})
	});
});
q.displayName = "GlassTextarea";
//#endregion
//#region src/components/GlassToast.tsx
var J = {
	success: "M5 10.5l3.2 3.2L15 7",
	error: "M6.5 6.5l7 7M13.5 6.5l-7 7",
	info: "M10 6v.5M10 9.5V14"
}, Y = ({ open: e, onClose: t, duration: n = 4500, tone: r = "success", className: a = "", children: o }) => (i(() => {
	if (!e || !n || !t) return;
	let r = setTimeout(t, n);
	return () => clearTimeout(r);
}, [
	e,
	n,
	t
]), /* @__PURE__ */ u("div", {
	role: r === "error" ? "alert" : "status",
	"aria-live": r === "error" ? "assertive" : "polite",
	"data-open": e,
	className: `glass-toast glass-toast--${r} ${a}`.trim(),
	children: [/* @__PURE__ */ l("span", {
		className: "glass-toast__icon",
		"aria-hidden": "true",
		children: /* @__PURE__ */ l("svg", {
			width: "20",
			height: "20",
			viewBox: "0 0 20 20",
			fill: "none",
			children: /* @__PURE__ */ l("path", {
				d: J[r],
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		})
	}), /* @__PURE__ */ l("span", { children: e ? o : null })]
}));
//#endregion
export { R as BG_PRESETS, j as CARD_BG_ALPHA, g as GLASS_BLUR, d as GLASS_DEFAULTS, _ as GLASS_LIGHT_ALPHA, h as GLASS_OPACITY, N as GLASS_REST_ANGLE, v as GLASS_SHADOW_ALPHA, A as GLOW_BL, k as GLOW_TR, W as GlassDivider, K as GlassInput, G as GlassInputWrap, B as GlassOrbs, V as GlassPanel, U as GlassPill, p as GlassProvider, q as GlassTextarea, Y as GlassToast, L as PATTERNS, M as getGlassStyles, z as makeHueGradient, m as useGlass, P as useGlassPointer, F as useGlassReveal };
