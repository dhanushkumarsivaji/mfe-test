import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Securities from "./container/securities";
import useGetApi from "./hooks/useGetApi";
import "devextreme/dist/css/dx.light.css";


export default ({ history, acquireToken, isAuthenticated = false }) => {

  const [token, setToken] = useState('')
  const [ renderApplication, setRenderApplication] = useState(false)

  const getToken = async () => {
       let isToken  = await acquireToken();
       if(isToken){
        setToken(isToken);
       }
  }

  useEffect(() => {
    getToken()
  },[])

  useEffect(() => {
    setRenderApplication(isAuthenticated)
    console.log("securities",isAuthenticated)
  },[isAuthenticated])

  const {
    result: { res, loading },
  } = useGetApi('securities', token);

  return !renderApplication ? <h1 style={{display:'flex', justifyContent:'center', alignItems: 'center', marginTop:'100px'}}>User needs to be authenticated before accessing the Securities page</h1>:  (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/securities/table" ><Securities data={res} loading={loading}/> </Route>
        </Switch>
      </Router>
    </div>
  );
};

//