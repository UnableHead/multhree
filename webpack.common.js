const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: ["babel-polyfill", "./src-front/index.js"],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src-front/index.html"
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {presets: ["react", "env"]}
      }
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ["file-loader"]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ["file-loader"]
    }, {
      type: "javascript/auto",
      test: /\.typeface\.json$/,
      use: ["file-loader"]
    }]
  }
};
