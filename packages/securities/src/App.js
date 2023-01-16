import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Securities from "./components/securities";
import useGetApi from "./hooks/useGetApi";
import "devextreme/dist/css/dx.light.css";


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

  const {
    result: { res, loading },
  } = useGetApi('securities', token);

  return (
    <div>

      <Router history={history}>
        <Switch>
          <Route path="/securities/table" ><Securities data={res} loading={loading}/> </Route>
        </Switch>
      </Router>
    </div>
  );
};
