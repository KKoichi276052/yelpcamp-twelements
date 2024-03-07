/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    transform: (content) => content.replace(/taos:/g, ""),
    files: ["./src/*.{html,js}"],
  },
  content: [
    "./public/**/*.{js,css}",
    "./views/**/*.ejs",
    // "./node_modules/tw-elements/dist/js/**/*.js",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: "class",
  plugins: [
    // require("tw-elements/dist/plugin.cjs"),
    require("taos/plugin"),
    require("preline/plugin"),
  ],
  safelist: [
    "!duration-[0ms]",
    "!delay-[0ms]",
    'html.js :where([class*="taos:"]:not(.taos-init))',
  ],
};
