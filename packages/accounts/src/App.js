import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Table from "./components/table";
import Edit from "./components/edit";
import User from "./components/user";
import { updateUserDetails } from "./features/userSlice";
import useGetApi from "./hooks/useGetApi";

export default ({ history, acquireToken }) => {

  const [token, setToken] = useState('')

  const getToken = async () => {
       let isToken  = await acquireToken();
       if(isToken){
        setToken(isToken);
       }
  }

  useEffect(() => {
    getToken()
  },[])


  const dispatch = useDispatch()

  const user =  { name: "Dhanush", age: 27, email: "user@test.com" }

  useEffect(() => {
      dispatch(updateUserDetails(user))
  },[])

  const {
    result: { res, loading, error, status },
  } = useGetApi('accounts', token);

  return (
    <div>

      <Router history={history}>
        <Switch>
          <Route path="/accounts/table" ><Table data={res} loading={loading}/> </Route>
          <Route path="/accounts/edit" component={Edit} />
          <Route path="/accounts/user" component={User} />
        </Switch>
      </Router>
    </div>
  );
};
