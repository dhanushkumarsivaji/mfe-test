const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },

  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'

    // You can change the configuration based on that.

    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need

    config.module.rules.push({
      test: /\.scss$/,

      use: ["style-loader", "css-loader?modules&importLoaders", "sass-loader"],

      include: path.resolve(__dirname, "../"),
    });

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.

    // config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)

    config.module.rules[0].use[0].loader = require.resolve("babel-loader");

    // use @babel/preset-react for JSX and env (instead of staged presets)

    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),

      require.resolve("@babel/preset-env"),
    ];

    // config.module.rules[0].use[0].options.plugins = [
    //   // use @babel/plugin-proposal-class-properties for class arrow functions

    //   require.resolve("@babel/plugin-proposal-class-properties"),
    // ];

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint

    config.resolve.mainFields = ["browser", "module", "main"];

    // Return the altered config

    return config;
  },
};
