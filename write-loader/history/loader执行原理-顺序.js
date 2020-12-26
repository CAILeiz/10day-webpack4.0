console.log(111)
let path = require("path");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolveLoader: {
        alias: {
            "loader1": path.resolve(__dirname, "loaders", "loader1"),
            "loader2": path.resolve(__dirname, "loaders", "loader2"),
            "loader3": path.resolve(__dirname, "loaders", "loader3"),
        }
    },
    module: {
        // loader的分类 pre在前面 normal正常 post在后面 加一个enforce属性 执行顺序 pre --> normal --> inline(在js文件中引入其他js文件 此时编译叫做行内编译 行内loader)
        //  -->  post [loader1~~~ loader2~~~ loader3~~]
        rules: [
            {
                test: /\.js$/,
                use: "loader1",
                enforce: "pre"
            },
            {
                test: /\.js$/,
                use: "loader2"
            },
            {
                test: /\.js$/,
                use: "loader3",
                enforce: "post"
            }
        ]
    }
}