"use strict";

const path              = require("path"),
      webpack           = require("webpack"),
      hmrPlugin         = new webpack.HotModuleReplacementPlugin(),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      ImageminPlugin    = require("imagemin-webpack-plugin").default,
      imageminMozjpeg   = require("imagemin-mozjpeg"),
      htmlWebpackPlugin = new HtmlWebpackPlugin({
        title: "Webpack Boilerplate Attempt 4",
        template: "./assets/index.ejs"
      }),
      extractTextPlugin = new ExtractTextPlugin({
        filename: "[contenthash:10].style.css",
        disable: process.env.NODE_ENV === "development"
      }),
      imageminPlugin    = new ImageminPlugin({
        disable: process.env.NODE_ENV !== "production",
        pngquant: {
          quality: "0-75"
        },
        plugins: [
          imageminMozjpeg({
            quality: 75,
            progressive: true
          })
        ]
      });

module.exports = {
  entry: "./assets/js/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[hash:10].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: [require("babel-plugin-transform-object-rest-spread")]
          }
        }
      }, {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          postcss: [require("autoprefixer")()],
          extractCSS: true,
          loaders: {
            js: {
              loader: "babel-loader",
              options: {
                presets: ["env"],
                plugins: ["babel-plugin-transform-object-rest-spread"]                
              }
            }
          }
        }
      }, {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")()],
              sourceMap: true
            }
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }],
          fallback: "style-loader"
        })
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "img/",
              name: "[name].[hash:10].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    hmrPlugin,
    extractTextPlugin,
    imageminPlugin
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