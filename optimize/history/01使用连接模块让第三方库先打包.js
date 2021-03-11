let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html"
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "dist", "manifest.json") // 先去查找manifest.json这个清单 找不到再去打包模块
        })
    ],
    devServer: {
        port: 3000,
        // open: true,
        compress: true,
        contentBase: "./dist" // 找不到会找内存中的
    },
    module: {
        noParse: /jquery/, // 不去解析jQuery中的依赖关系
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.js$/,
                use:  {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }, // 给happypack指定打包的类型 id为js的模块
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src")
            }
        ]
    }
}