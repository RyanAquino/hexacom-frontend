import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/Theme';
import AdminDashboard from './ui/admin-dashboard';
// import LoginPage from './ui/loginPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AdminDashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
