let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let  miniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    devServer: { 
        port: 3000, 
        progress: true, 
        contentBase: "./build", 
        open: true, 
        compress: true, 
    },
    mode: "production", 
    entry: "./src/index.js",
    output: {
        filename: "bundle.[hash:8].js", 
        path: path.resolve(__dirname, "build") 
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html", 
            minify: { 
                removeAttributeQuotes: true, 
                collapseWhitespace: true, 
            },
            hash: true, 
        }),
        new miniCssExtractPlugin({
            filename: "main.css" // 放到当前./build下的main.css文件中
        }) 
    ],
    module: { 
        rules: [ 
            
            {
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader, // 使用link引入
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    miniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            }
        ]
    }
}