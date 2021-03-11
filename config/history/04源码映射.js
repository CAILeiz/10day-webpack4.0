let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "production",
    // 多入口
    entry: {
        home: "./src/index.js"
    },
    output: {
        // [name] 表示 home,other
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    // 1) 源码映射, 会单独生成一个sourcemap文件 出错了 会标识报错的列和行 大和全
    // devtool: "source-map" 增加映射文件 可以帮我们调试源代码
    // 2) devtool: "eval-source-map" 不会产生单独的文件 可以显示行和列
    // 3) devtool: "cheap-module-source-map" 不会产生列 但是是一个单独的映射文件 产生后你可以保留起来调试  **** 不常用
    // 4) devtool: "cheap-module-eval-source-map"  不会生成文件 集成在打包后的文件中 不会产生列 但是会指示出错的位置
    devtool: "cheap-module-eval-source-map",  
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
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