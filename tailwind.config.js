/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{svelte,html,ts,js}",
    'node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}', // Incluir Flowbite-Svelte
    'node_modules/flowbite/**/*.{html,js}',
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}