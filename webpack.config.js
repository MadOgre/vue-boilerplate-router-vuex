"use strict";

const path              = require("path"),
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
    htmlWebpackPlugin
  ]
};