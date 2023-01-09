import React from 'react';
import {  Router } from 'react-router-dom';
import Sidenav from './components/Sidenav';
import Table from './components/Table';

export default ({ history }) => {
  return (
    <div>
        <Router history={history}>
            <Sidenav />
            <Table />
        </Router>
    </div>
  );
};
