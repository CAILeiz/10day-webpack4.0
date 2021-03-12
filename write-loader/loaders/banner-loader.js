const loaderUtils = require("loader-utils");
const fs = require("fs");
const {validate} = require("schema-utils")
function loader(source) {
    const options = loaderUtils.getOptions(this);
    const {filename, text} = options;
    const cb = this.async();
    const schema = {
        type: "object",
        properties: {
            filename: {
                type: "string"
            },
            text: {
                type: "string"
            }
        }
    }
    validate(schema, options)
    if(filename) {
        fs.readFile(filename, {encoding: "utf-8"}, (err, data) => {
            if(err) {
                cb(err, err)
            } else {
                data = `/**${data}**/${source}`
                cb(null, data)
            }
        })
    } else {
        const data = `/**${text}**/${source}`;
        cb(null, data)
    }
}
module.exports = loader;





















// let loaderUtils = require("loader-utils"); // 用来获取loader的上下文 比如options啥的
// let {validate} = require("schema-utils"); // 检验options参数不为空  第一个参数是自己写的规则 第二个参数是需要检验的参数 这两个参数的数据必须对应上 第三个参数是显示的报错loader名称
// let fs = require("fs");
// function loader(source) {
//     this.cacheable && this.cacheable(false); // 是否开启缓存 默认缓存
//     let options = loaderUtils.getOptions(this);
//     console.log("source", source);
//     console.log("options", options);
//     let cb = this.async(); // 创建异步
//     // 校验options中的参数是否为空
//     let schema = {
//         type: "object",
//         properties: {
//             text: {
//                 type: "string"
//             },
//             filename: {
//                 type: "string"
//             }
//         }
//     }
//     // validate(schema, options, "banner-loader");
//     if(options.filename) {
//         this.addDependency(options.filename); // webpack.config.js中加了watch属性, 当该文件内容发生改变会重新打包
//         fs.readFile(options.filename, {encoding: "utf-8"}, function(err, data) {
//             data = `/**${data}**/${source}`;
//             console.log("data", data);
//             cb(err, data);
//         })
//     } else {
//         cb(null, `/**${options.text}**/${source}`);
//     }
//     return source;
// }
// module.exports = loader