import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0B72B9',
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;
