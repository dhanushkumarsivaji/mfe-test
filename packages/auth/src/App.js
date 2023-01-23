import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';

export default ({ history, onSignIn }) => {
  return (
    <div>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <Signin onSignIn={onSignIn} />
            </Route>
            <Route path="/auth/signup">
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
    </div>
  );
};

//