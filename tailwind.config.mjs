import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	daisyui: {
		themes: [
			"light",
			"dark",
			"cupcake",
			"bumblebee",
			"emerald",
			"corporate",
			"synthwave",
			"retro",
			"cyberpunk",
			"valentine",
			"halloween",
			"garden",
			"forest",
			"aqua",
			"lofi",
			"pastel",
			"fantasy",
			"wireframe",
			"luxury",
			"dracula",
			"cmyk",
			"autumn",
			"business",
			"acid",
			"lemonade",
			"night",
			"coffee",
			"winter",
			"dim",
			"nord",
			"sunset",
			{
				'black': {
					'primary': '#ffffff',
					'primary-focus': '#ffffff',
					'primary-content': '#000000',

					'secondary': '#ffffff',
					'secondary-focus': '#ffffff',
					'secondary-content': '#000000',

					'accent': '#ffffff',
					'accent-focus': '#ffffff',
					'accent-content': '#000000',

					'neutral': '#333333',
					'neutral-focus': '#4d4d4d',
					'neutral-content': '#ffffff',

					'base-100': '#000000',
					'base-200': '#333333',
					'base-300': '#4d4d4d',
					'base-content': '#ffffff',

					'info': '#0000ff',
					'success': '#008000',
					'warning': '#ffff00',
					'error': '#ff0000',

					'--rounded-box': '0',
					'--rounded-btn': '0',
					'--rounded-badge': '0',

					'--animation-btn': '0',
					'--animation-input': '0',

					'--btn-text-case': 'lowercase',
					'--navbar-padding': '.5rem',
					'--border-btn': '1px',
				},
			},
		],
	},
	theme: {
		extend: {

		}
	},
	plugins: [require('daisyui'), require("tailwindcss-animate")],
};
