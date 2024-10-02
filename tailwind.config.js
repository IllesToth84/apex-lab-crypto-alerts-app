/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // biztosítja, hogy minden JSX, TSX fájlt figyel
    ],
    theme: {
        extend: {
            colors: {
                customOrange: '#fc8c14',
            },
        },
    },
    plugins: [],
};
