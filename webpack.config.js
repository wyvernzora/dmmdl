const path = require("path");
const webpack = require("webpack");

const header = `// ==UserScript==
// @name         DMM Book Downloader
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dmm.com
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds download button to DMM book viewer.
// @author       You
// @match        *://book.dmm.com/streaming/*
// @match        *://book.dmm.co.jp/streaming/*
// @grant        none
// ==/UserScript==
`;

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      path: "path-browserify",
    },
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: header,
      raw: true,
      entryOnly: true,
    }),
  ],
  output: {
    filename: "dmmdl.user.js",
    path: path.resolve(__dirname, "dist"),
    library: "dmmdl",
  },
  optimization: {
    minimize: false,
  },
};
