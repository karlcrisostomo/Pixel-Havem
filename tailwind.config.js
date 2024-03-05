/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "celtic-blue": "#266DD3",
        "cerulean-blue": "#6295E1",
        "saphire-blue": "#1055DA",
        "turquoise-blue": "#3FACE5",
        "cobalt-blue": "#2870E0",
      },
    },
  },
  plugins: [],
};
