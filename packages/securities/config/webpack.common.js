const Dotenv = require('dotenv-webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react','@babel/preset-env' ],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /.(png|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /.(ttf|woff|woff2)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new Dotenv()
  ],
};