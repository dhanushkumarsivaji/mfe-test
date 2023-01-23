const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:3006/',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 3006,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'securities',
      filename: 'remoteEntry.js',
      exposes: {
        './SecuritiesApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
