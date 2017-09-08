"use strict";

const path              = require("path"),
      webpack           = require("webpack"),
      hmrPlugin         = new webpack.HotModuleReplacementPlugin(),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      htmlWebpackPlugin = new HtmlWebpackPlugin({
        title: "Webpack Boilerplate Attempt 4",
        template: "./assets/index.ejs"
      });

module.exports = {
  entry: "./assets/js/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[hash:10].bundle.js"
  },
  plugins: [
    htmlWebpackPlugin,
    hmrPlugin
  ],
  devServer: {
    open: true,
    hot: true,
    port: 4000,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/api/": "http://localhost:3000"
    },
    noInfo: true,
    contentBase: path.resolve(__dirname, "assets")
  },
  devtool: process.env.NODE_ENV === "development" ? "source-map" : false
};