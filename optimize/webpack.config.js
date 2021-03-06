let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html"
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin() // 热更新的插件
    ],
    devServer: {
        port: 3000,
        compress: true,
        contentBase: "./dist", // 找不到会找内存中的
        hot: true // 启动热更新
    },
    module: {
        noParse: /jquery/, // 不去解析jQuery中的依赖关系
        rules: [
            {
                test: /\.less$/,
                use:  [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }, 
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src")
            }
        ]
    }
}