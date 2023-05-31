import "./MuiClassNameSetup";
import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { PublicClientApplication , EventType} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import App from "./App";

const history = createBrowserHistory();
const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback(event => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
      console.log(event.payload.account);
      pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MsalProvider instance={msalInstance}>
    <Router history={history}>
      <App />
    </Router>
  </MsalProvider>
);
