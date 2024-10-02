/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // biztosítja, hogy minden JSX, TSX fájlt figyel
    ],
    theme: {
        extend: {
            colors: {
                customBlue: '#001b53',
                customGreen: '#018d25',
                customLightGreen: '#d2fcdd',
                customOrange: '#fc8c14',
            },
        },
    },
    plugins: [],
};
