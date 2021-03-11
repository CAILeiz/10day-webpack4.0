let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");
let webpack = require("webpack");
module.exports = {
    mode: "production",
    entry: {
        home: "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    watch: true,
    watchOptions: { // 监控的选项
        poll: 1000, // 每秒问我1000次
        aggregateTimeout: 500, // 防抖
        ignored: /node_modules/ // 不需要进行监控的文件
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "home.html",
        }),
        // new CleanWebpackPlugin("./dist"), // 如果想要清除多个文件夹的目录可以传入一个数组 如果是一个的话只需要传入一个路径文件夹
        new CopyWebpackPlugin([ // 拷贝插件
            {from: "./doc", to: "./"}
        ]),
        new webpack.BannerPlugin("make 2020 by dalei")
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
}