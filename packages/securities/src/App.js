import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Securities from "./components/securities";
import useGetApi from "./hooks/useGetApi";
import "devextreme/dist/css/dx.light.css";


export default ({ history, acquireToken }) => {

  const [token, setToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJiZGY4NjYwOC0yOGZlLTRiYzQtYTU3OS02M2U3YTE5ODQyMTkiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYWJiMWNhZjQtZTEwZC00NjlkLWJiN2UtYzY5NDJlM2Y0MTVhL3YyLjAiLCJpYXQiOjE2NzQwMjUwNjQsIm5iZiI6MTY3NDAyNTA2NCwiZXhwIjoxNjc0MDMwMzI3LCJhaW8iOiJBVFFBeS84VEFBQUFUdjNhVVZsVFhET0ZGcTB4SVU2dGphSFhTbUloaEVLT3VoOHZtZmViNmtiMEZFZ0gvZlNCdUdoRnNaeCs3ejZlIiwiYXpwIjoiZDhjNzUxYTgtMTcyNi00ZDE4LWJmZWItNjBjNDJkNzY1YjcwIiwiYXpwYWNyIjoiMCIsIm5hbWUiOiJQcmF2ZWVuIiwib2lkIjoiNWFiNjVkYzAtYWQzZS00ODY3LWE2NWEtNjc2ZjE4Y2NmYjZlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiUHJhdmVlbkBwYWh1amFzdW5ueWhvdG1haWwub25taWNyb3NvZnQuY29tIiwicmgiOiIwLkFTb0E5TXF4cXczaG5VYTdmc2FVTGo5QldnaG0tTDMtS01STHBYbGo1NkdZUWhrcUFEUS4iLCJzY3AiOiJDb21wbGFpbmNlLlJlYWQgUmFuay5SZWFkIFVzZXIuUmVhZCIsInN1YiI6IlVLV25jenFkY3hrLUp3dVM1eHdQeHNST1BuNldMcjFJMXMxRlc5TEloZG8iLCJ0aWQiOiJhYmIxY2FmNC1lMTBkLTQ2OWQtYmI3ZS1jNjk0MmUzZjQxNWEiLCJ1dGkiOiJZMmU5RGNhUGMweXdTNXBqelMxcEFBIiwidmVyIjoiMi4wIn0.K4gXeVAGkjHu87X88h4tANGxeqnkNFZzloCvPzo8W13vPBqJXCMca4CYNRWfQ5tumbTLsuGbOeusar7vpxnAvYEuzZM2n-OE2oBeWtka1qkmU9VF3v-Q0YzvzxFGAFx1N4m5SjcZCKOjIGCIr8gqiNaqKF0-kI3dhZLXRa_D8rOX4wfFuhm6H9bU0r-qITy6Sj-RFBAxtgITzToKlBCw_Tq96DSIlXo_gayuOxmvEoefXuyWrYiSakExQbF5jCQYhxjeSIBILlv41Aqep3V1iiznRyfgdSqQqZofQB_YHnXgvhtg1s2A4_pBQCDzy8Uqkl5ItjBypiHskdWxEQWRPA')

  const getToken = async () => {
       let isToken  = await acquireToken();
       if(isToken){
        setToken(isToken);
       }
  }

  // useEffect(() => {
  //   getToken()
  // },[])

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
