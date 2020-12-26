const babel = require("@babel/core");
let loaderUtils = require("loader-utils")
function loader(source) {
    console.log(Object.keys(this));
    let options = loaderUtils.getOptions(this); // this就是loader context
    console.log(options); // { presets: [ '@babel/preset-env' ] } 
    let cb = this.async();
    // 第一个参数是将要转换的源码 source
    // 第二个参数是一个Object 里面有根据什么转换 options是{ presets: [ '@babel/preset-env' ] } 
    // 第三个参数是回调函数 这个函数是异步返回的 所以需要引入cb 里面是cb cb第一个参数是err 第二个是转换成功的代码 第三个是输出map文件
    babel.transform(source, {
        ...options,
        sourceMaps: true, // 配置完map
        filename: this.resourcePath.split("/").pop() // 设置文件名
    }, function(err, result) {
        // cb第一个参数如果随便填值会被认为是一个错误
        cb(err, result.code, result.map) // 异步
        // cb(err, result.code) // 异步
    })
    // return source;
}
module.exports = loader;