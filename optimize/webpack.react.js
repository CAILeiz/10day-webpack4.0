let path = require("path");
let webpack = require("webpack");
module.exports = {
    mode: "development",
    entry: {
        react: ["react", "react-dom"]
    },
    output: {
        filename: "_dll_[name].js", // 产生的文件名 把当前打包输出的文件定义成一个动态连接库 需要有一个清单可以找到这个文件中的所有模块
        path: path.resolve(__dirname, "dist"),
        library: "_dll_[name]", // 给打包好的文件定义导出
        libraryTarget: "var" // 给打包好的文件定义导出的语法 "var"(默认) | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
    },
    plugins: [
        new webpack.DllPlugin({ // 这里面配置的name需要和library名称一致 会输出一个json模块的对应关系
            name: "_dll_[name]",
            path: path.resolve(__dirname, "dist", "manifest.json")
        })
    ]
}