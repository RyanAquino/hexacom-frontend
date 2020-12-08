import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/Theme';
import LoginPage from './ui/loginPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{}}>
        <LoginPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
