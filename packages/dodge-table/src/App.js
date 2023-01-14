import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Table from "./components/table";
import Edit from "./components/edit";
import User from "./components/user";
import { updateUserDetails } from "./features/userSlice";
import useGetApi from "./hooks/useGetApi";

export default ({ history, token }) => {

  const dispatch = useDispatch()

  const user =  { name: "Dhanush", age: 27, email: "user@test.com" }

  useEffect(() => {
      dispatch(updateUserDetails(user))
  },[])

  const {
    result: { res, loading, error, status },
  } = useGetApi('accounts', token);


  useEffect(() => {
      console.log(res, loading, error, status);
  }, [res, loading, error, status]);


  return (
    <div>

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
