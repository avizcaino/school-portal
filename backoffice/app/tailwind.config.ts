// import * as colors from '@mui/material/colors';
// import {Config} from 'tailwindcss';
// //MUI palette replace tailwind palette

// const config: Config = {
//   content: ['../*/src/**/*.{js,ts,jsx,tsx}', './index.html'],
//   theme: {
//     extend: {
//       colors: {
//         ...colors,
//         primary: '#008f86',
//         secondary: '#eed102',
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;

import {nextui} from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    '../*/src/**/*.{js,ts,jsx,tsx}',
    './index.html',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
};

export default config;
