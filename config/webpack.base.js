let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    entry: {
        home: "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: { // 解析第三方包指定查找的包
        modules: [path.resolve("node_modules")],
        alias: { // 别名 vue vue.runtime
            bootstrap: "bootstrap/dist/css/bootstrap.css"
        },
        extensions: ['.js','.css', '.json'] // 找拓展名 先找js 再找 css 再找 json
        // mainFields: ["style", "main"], // 在node_modules下面的packjson中先找style 再找main
        // mainFiles: [] // 入口文件的名字 index.js
    },
    devServer: {
        // contentBase: "./dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
        }),
        new webpack.DefinePlugin({
            "DEV": JSON.stringify("production"), // 相当于console.log('production')
            "FLAG": "true", // 相当于输出 true
            "EXPRESSION": "1+1" // console.log(2)
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', "css-loader"]
            },
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