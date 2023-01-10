import React from 'react';
import {  Router } from 'react-router-dom';
import Sidenav from './components/Sidenav';

export default ({ history }) => {
  return (
    <div>
        <Router history={history}>
            <Sidenav />
        </Router>
    </div>
  );
};
