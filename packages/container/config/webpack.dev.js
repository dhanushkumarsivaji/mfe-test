const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3000/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:3001/remoteEntry.js',
        auth: 'auth@http://localhost:3002/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:3003/remoteEntry.js',
        sidebar: 'sidebar@http://localhost:3004/remoteEntry.js',
        accounts: 'accounts@http://localhost:3005/remoteEntry.js',
        securities: 'securities@http://localhost:3006/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ]
};

module.exports = merge(commonConfig, devConfig);