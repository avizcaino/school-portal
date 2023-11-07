import createTheme from '@mui/material/styles/createTheme';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigModule from '../../../tailwind.config';

const tailwindConfig = resolveConfig(tailwindConfigModule);

const paletteTheme = createTheme({
  palette: {
    primary: {
      main: `${tailwindConfig.theme.colors.primary}`,
    },
    secondary: {
      main: `${tailwindConfig.theme.colors.secondary}`,
    },
  },
});

export const theme = createTheme(paletteTheme, {
  typography: {
    fontFamily: ['Roboto'].join(','),
  },
});
