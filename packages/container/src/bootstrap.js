import './MuiClassNameSetup';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router} from "react-router-dom";
import { createBrowserHistory } from "history";
import AuthState from './context/auth/state';
import App from './App';


const history = createBrowserHistory()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( <AuthState><Router history={history}><App /></Router></AuthState>);
