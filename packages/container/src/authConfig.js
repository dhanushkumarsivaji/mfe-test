/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    clientId: "d8c751a8-1726-4d18-bfeb-60c42d765b70", //"Enter_the_Application_Id_Here",
    authority: "https://login.microsoftonline.com/abb1caf4-e10d-469d-bb7e-c6942e3f415a", //"Enter_the_Cloud_Instance_Id_HereEnter_the_Tenant_Info_Here",
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ["User.Read"],
};

export const customApiRequest = {
  scopes: ["https://spdemoapim.azure-api.net/"],
};
// api://bdf86608-28fe-4bc4-a579-63e7a1984219/User.Read
/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me", //"Enter_the_Graph_Endpoint_Herev1.0/me",
};

// const pca = new PublicClientApplication({
//   auth: {
//     clientId: "f8fbb5f9-6753-48e5-a3a4-5fc6c8db4ca0",
//     authority:
//       "https://login.microsoftonline.com/39de4c31-5af6-43b4-8418-bb6a45179340",
//     redirectUri: "/",
//   },
//   cache: {
//     cacheLocation: "sessionStorage",
//     storeAuthStateInCookie: false,
//   },
//   system: {},
// });
