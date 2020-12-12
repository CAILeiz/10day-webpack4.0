let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
let Happypack = require("happypack");
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
        }),
        new Happypack({
            id: "js",
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            ]
        }),
        new Happypack({
            id: "css",
            use: [
                "style-loader",
                "css-loader",
                "less-loader"
            ]
        })
    ],
    devServer: {
        port: 3000,
        compress: true,
        contentBase: "./dist" // 找不到会找内存中的
    },
    module: {
        noParse: /jquery/, // 不去解析jQuery中的依赖关系
        rules: [
            {
                test: /\.less$/,
                use: "Happypack/loader?id=css"
            },
            {
                test: /\.js$/,
                use: "Happypack/loader?id=js", // 给happypack指定打包的类型 id为js的模块
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src")
            }
        ]
    }
}