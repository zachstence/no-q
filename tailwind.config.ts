import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				display: ['Dosis', 'ui-sans-serif']
			}
		}
	},

	plugins: [daisyui]
} as Config;
