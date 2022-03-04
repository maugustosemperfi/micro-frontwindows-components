const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
// const devConfig = require("./webpack.dev");
// const prdConfig = require("./webpack.prod");
const packageJson = require("./package.json");
const deps = packageJson.dependencies;

module.exports = {
  webpack: (config, { webpack }) => {
    const { ModuleFederationPlugin } = webpack.container;

    config.plugins.push(
      new ModuleFederationPlugin({
        name: "task_tracker_components",
        library: {
          type: config.output.libraryTarget,
          name: "task_tracker_components",
        },
        filename: "static/runtime/remoteEntry.js",
        exposes: {
          "./Button": "./src/components/Button",
          "./Card": "./src/components/Card",
          "./CardContent": "./src/components/CardContent",
          "./CardHeader": "./src/components/CardHeader",
        },
        remotes: {},
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
          "@material-ui/core": {
            singleton: true,
          },
          "@material-ui/icons": {
            singleton: true,
          },
          "@material-ui/lab": {
            singleton: true,
          },
          "styled-components": {
            singleton: true,
            requiredVersion: deps["styled-components"],
          },
        },
        shared: [],
      })
    );
    return config;
  },
};
