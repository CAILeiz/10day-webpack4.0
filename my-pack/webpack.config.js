let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let path = require("path");
module.exports = {
    mode: "production",
    entry: {
        main: "./src/main.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "bundle"),
        publicPath: "./" //  Automatic publicPath is not supported in this browser 需要指定./
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "main.html",
            template: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/main.css"
        })
    ],
    devServer: {
        port: "8888",
        progress: true,
        contentBase: "./bundle",
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        include: path.resolve(__dirname, "src"),
                        exclude: /node_modules/,
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader",  "less-loader"]
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1000 * 3,
                        outputPath: "imgs/"
                    }
                }
            }
        ]
    },


}