import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily:  [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#FAA727',
    },
    secondary: {
      main: '#124C5F',
    },
  },
});

export default theme;