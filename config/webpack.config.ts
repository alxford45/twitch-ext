import nodeExternals from "webpack-node-externals";
import { Configuration } from "webpack";

import {
  server,
  web,
  devServer,
  types,
  nodemonPlugin,
  htmlWebpackPlugin,
  BabelLoader,
  TSLoader
} from "./config";

const configuration: Configuration[] = [
  {
    name: server.name,
    entry: server.entry,
    context: server.context,
    mode: "development",
    module: {
      rules: [
        {
          test: /\.ts|.js$/,
          exclude: /node_modules/,
          use: [BabelLoader, TSLoader]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        types: types
      }
    },
    target: "node",
    externals: [nodeExternals()],
    plugins: [nodemonPlugin]
  },
  {
    name: web.name,
    entry: web.entry,
    mode: "development",
    devServer: devServer,
    module: {
      rules: [
        {
          test: /\.ts(x?)|.js(x?)$/,
          exclude: /node_modules/,
          use: [BabelLoader, TSLoader]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        types: types
      }
    },
    plugins: [htmlWebpackPlugin]
  }
];

export default configuration;
