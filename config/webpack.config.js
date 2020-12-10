let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
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
            filename: "index.html",
        })
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