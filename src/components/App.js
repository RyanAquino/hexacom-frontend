import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { Redirect } from 'react-router';
import theme from './ui/Theme';
import Dashboard from './ui/Dashboard';
import LoginPage from './ui/Login';
import Accounts from './ui/Accounts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/accounts" component={Accounts} />
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
