/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./blog.html", "./public/src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				times: ["Times New Roman", "serif"],
			},
		},
	},
	plugins: [],
};
