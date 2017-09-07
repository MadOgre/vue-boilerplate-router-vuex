"use strict";

const path = require("path");

module.exports = {
  entry: "./assets/js/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[hash:10].bundle.js"
  }
};