const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// Try to load custom config
const filePath = "./webpack.config.custom";
let customConfig = {};
try{
    customConfig = require(filePath);
}catch(e){
    console.warn("File \"" + filePath + "\" does not exist. No custom config will be applied");
}


console.log("Matthias", customConfig);

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
        overlay: {
            warnings: true,
            errors: true
        },
        ...customConfig.devServer
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            title: "Output Management"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        namedModules: true
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ["file-loader"]
        }]
    }
};
