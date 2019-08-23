import nodemon from "config/nodemon";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { RuleSetUseItem } from "webpack";
import { Configuration as DevServer } from "webpack-dev-server";
import { Dirname as dirname, Path as path } from "../path";

export const types = path.resolve(dirname, "types");

export const web = {
  name: "web",
  entry: "./web/index.ts"
};
export const server = {
  name: "server",
  entry: "./server/index.ts",
  context: path.resolve(dirname)
};
export const devServer: DevServer = {
  host: "localhost",
  port: 8080,
  hot: false,
  proxy: {
    "**": "http://localhost:3000"
  }
};

export const BabelLoader: RuleSetUseItem = {
  loader: "babel-loader",
  options: {
    sourceType: "unambiguous"
  }
};
export const TSLoader: RuleSetUseItem = {
  loader: "ts-loader"
};

const NodemonPlugin = require("nodemon-webpack-plugin") as nodemon.WebpackPlugin;
export const nodemonPlugin = new NodemonPlugin({
  script: "dist/main.js"
});
export const htmlWebpackPlugin: HtmlWebpackPlugin = new HtmlWebpackPlugin({
  template: "./web/index.html"
});
