import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Table from "./components/table";
import Edit from "./components/edit";

export default ({ history, token }) => {
  return (
    <div>
     {JSON.stringify(token, null, 4)}
      <Router history={history}>
        <Switch>
            <Route path='/dodge/table' component={Table}/>
            <Route path='/dodge/edit' component={Edit}/>
        </Switch>
      </Router>
    </div>
  );
};
