import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A10E25',
    },
    secondary: {
      main: '#0288d1',
    },
    tertiary: {
      main: '#4fc3f7',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
