const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// const ACCOUNTS_DOMAIN = process.env.REACT_APP_ACCOUNTS_DOMAIN;
// const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
// const DASHBOARD_DOMAIN = process.env.REACT_APP_DASHBOARD_DOMAIN;
// const MARKETING_DOMAIN = process.env.REACT_APP_MARKETING_DOMAIN;
// const SECURITITES_DOMAIN = process.env.REACT_APP_SECURITITES_DOMAIN;
// const SIDEBAR_DOMAIN = process.env.REACT_APP_SIDEBAR_DOMAIN;

const ACCOUNTS_DOMAIN = "http://localhost:3005";
const AUTH_DOMAIN = "http://localhost:3002";
const MARKETING_DOMAIN = "http://localhost:3001"
const SECURITITES_DOMAIN = "http://localhost:3004"
const SIDEBAR_DOMAIN = "http://localhost:3006"


const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${MARKETING_DOMAIN}/remoteEntry.js`,
        auth: `auth@${AUTH_DOMAIN}/remoteEntry.js`,
        sidebar: `sidebar@${SIDEBAR_DOMAIN}/remoteEntry.js`,
        accounts: `accounts@${ACCOUNTS_DOMAIN}/remoteEntry.js`,
        securities: `securities@${SECURITITES_DOMAIN}/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
