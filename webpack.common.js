const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { TuneDtsPlugin } = require("@efox/emp-tune-dts-plugin");

const webpack = require("webpack");
const path = require("path");

const packageJson = require("./package.json");
const deps = packageJson.dependencies;
const createName = `${packageJson.name}-${packageJson.version}.d.ts`;
const createPath = "./dist/@types";

const Dotenv = require("dotenv-webpack");
require("dotenv").config();

module.exports = {
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    plugins: [new TsConfigPathsPlugin()],
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "core_components",
      filename: "remoteEntry.js",
      exposes: {},
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
    }),
    // new HtmlWebpackPlugin({
    //   template: "./public/index.html",
    // }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new TuneDtsPlugin({
      output: path.join(createPath, createName),
      path: createPath,
      name: createName,
      isDefault: true,
    }),
  ],
};
