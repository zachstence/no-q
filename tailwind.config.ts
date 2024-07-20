import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				display: ['Dosis', 'ui-sans-serif']
			}
		}
	},

	plugins: []
} as Config;
