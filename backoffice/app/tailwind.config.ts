import * as colors from '@mui/material/colors';
import {Config} from 'tailwindcss';
//MUI palette replace tailwind palette

const config: Config = {
  content: ['../*/src/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#008f86',
        secondary: '#eed102',
      },
    },
  },
  plugins: [],
};
export default config;
