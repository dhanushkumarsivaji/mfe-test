import React, { useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Landing from './components/Landing';
import Products from './components/Products';
import User from './components/User';
import { updateUserDetails } from "./features/userSlice";


export default ({ history }) => {
  const dispatch = useDispatch()

  const user =  { name: "Dharma", age: 27, email: "dharma@test.com" }

  useEffect(() => {
      dispatch(updateUserDetails(user))
  },[])

  return (
    <div>
        <Router history={history}>
          <Switch>
            <Route path="/products" component={Products} />
            <Route path="/user" component={User} />
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
    </div>
  );
};
