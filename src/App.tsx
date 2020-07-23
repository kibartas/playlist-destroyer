import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import { NotFound, UserHome } from './pages';

const App = (): ReactElement => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/:username" exact>
        <UserHome />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

export default App;
