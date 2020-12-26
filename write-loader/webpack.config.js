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
    resolveLoader: { 
        modules: ["node_modules", path.resolve(__dirname, "loaders")]
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: "banner-loader", // 在js文件前面加一个注释
                    options: {
                        text: "dalei",
                        filename: path.resolve(__dirname, "banner.js")
                    }
                }
            },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             presets: ["@babel/preset-env"]
            //         }
            //     },
            //     include: path.resolve(__dirname, "src"),
            // }
        ]
    }
}