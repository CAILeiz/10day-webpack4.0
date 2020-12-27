let path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileListPlugin = require("./plugins/FileListPlugin.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InlineSourcePlugin = require('./plugins/InlineSourcePlugin')
// MiniCssExtractPlugin 既有loader也有plugin
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "home.html"
        }),
        new FileListPlugin({
            filename: "list.md"
        }),
        new InlineSourcePlugin({
            match: /\.(js|css)$/
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
}