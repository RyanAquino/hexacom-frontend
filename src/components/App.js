import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/Theme';
// import AdminDashboard from './ui/admin-dashboard';
import LoginPage from './ui/loginPage';
import Header from './ui/header';
import AdminDashboard from './ui/admin-dashboard';
import AdminAccounts from './ui/admin-accounts';
// import AdminAccounts from './ui/admin-accounts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/dashboard" component={AdminDashboard} />
          <Route exact path="/accounts" component={AdminAccounts} />
          <Route exact path="/configurations" component={() => <div>Configurations</div>} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
