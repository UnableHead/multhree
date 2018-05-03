const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common.js");

// Try to load custom config
const filePath = "./webpack.custom";
let customConfig = {};
try{
    customConfig = require(filePath);
}catch(e){
    console.warn("File '" + filePath + "' does not exist. No custom config will be applied");
}

module.exports = merge(common, {
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        namedModules: true
    },
    mode: "development"
}, customConfig);
