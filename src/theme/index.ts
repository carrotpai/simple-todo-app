import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    lightgray: Palette['primary'];
    lightblue: Palette['primary'];
    lightviolet: Palette['primary'];
  }

  interface PaletteOptions {
    lightgray?: PaletteOptions['primary'];
    lightblue?: PaletteOptions['primary'];
    lightviolet?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    form: true;
  }
}

let defaultTheme = createTheme();

defaultTheme = createTheme({
  palette: {
    lightgray: defaultTheme.palette.augmentColor({
      color: {
        main: '#DBDFEA',
      },
      name: 'lightgray',
    }),
  },
});

export const theme = createTheme({
  palette: {
    lightgray: defaultTheme.palette.augmentColor({
      color: {
        main: '#DBDFEA',
      },
      name: 'lightgray',
    }),
    lightblue: defaultTheme.palette.augmentColor({
      color: {
        main: '#8294C4',
      },
      name: 'lightblue',
    }),
    lightviolet: defaultTheme.palette.augmentColor({
      color: {
        main: '#ACB1D6',
      },
      name: 'lightviolet',
    }),
  },
  typography: {
    fontFamily: ['Inter', 'Arial', 'sans-serif'].join(','),
    body1: {
      fontSize: '18px',
      lineHeight: 'normal',
    },
    body2: {
      fontSize: '18px',
      lineHeight: 'normal',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'form' },
          style: {
            textTransform: 'none',
            backgroundColor: defaultTheme.palette.primary.main,
            color: '#ffffff',
            ':hover': {
              backgroundColor: defaultTheme.palette.primary.main,
            },
          },
        },
      ],
    },
  },
});
