const { hairlineWidth } = require("nativewind/theme");
const colors = require("tailwindcss/colors");

function palette(colors, name = 500) {
	return { ...colors, DEFAULT: colors[name] };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				primary: palette(colors.violet),
				content: colors.black,
				default: colors.gray[200],
				line: colors.gray[200],
				background: colors.white,
				component: colors.gray[100],
				error: palette(colors.red),
				success: palette(colors.green),
				info: palette(colors.sky),
				warning: palette(colors.amber),
				muted: colors.gray[500],
			},
			borderWidth: {
				hairline: hairlineWidth(),
			},
			borderRadius: {
				DEFAULT: "8px",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
