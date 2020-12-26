console.log(111)
let path = require("path");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: path.resolve(__dirname, "loaders", "babel-loader.js"),
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                include: path.resolve(__dirname, "src"),
            }
        ]
    }
}