
let path = require("path");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolveLoader: { 
        // modules: ["node_modules", path.resolve(__dirname, "loaders")],
        alias: {  // 别名
            loader1: path.resolve(__dirname, "loaders", "loader1.js")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "loader1"
            }
        ]
    }
}