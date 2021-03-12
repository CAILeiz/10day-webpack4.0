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
            // 实现注释loader
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
            // 实现url-loader 和 file-loader
            // {
            //     test: /\.jpg$/,
            //     // 目的是根据图片生成一个md5戳 发射到dist目录下 file-loader还会返回当前的图片路径
            //     // use: "file-loader",

            //     // url-loader 1. 交给file-loader处理路径发射文件
            //     //            2. 有选项 大于limit 生成图片 反之生成base64
            //     use: {
            //         loader: "url-loader-my",
            //         options: {
            //             limit: 200 * 1024 // 200kb
            //         }
            //     }
            // },
            // 实现babel-loader 
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                include: path.resolve(__dirname, "src"),
            },
            // 实现less-loader css-loader
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    }
}