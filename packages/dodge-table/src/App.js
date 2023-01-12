import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Table from "./components/table";
import Edit from "./components/edit";
import User from "./components/user";
import { updateUserDetails } from "./features/userSlice";

export default ({ history, token }) => {

  const dispatch = useDispatch()

  const user =  { name: "Dhanush", age: 27, email: "user@test.com" }

  useEffect(() => {
      dispatch(updateUserDetails(user))
  },[])


  return (
    <div>
      <p style={{ display: "flex", justifyContent: "center" }}>
        {JSON.stringify(token, null, 4)}
      </p>
      <Router history={history}>
        <Switch>
          <Route path="/dodge/table" component={Table} />
          <Route path="/dodge/edit" component={Edit} />
          <Route path="/dodge/user" component={User} />
        </Switch>
      </Router>
    </div>
  );
};
