let loaderUtils = require("loader-utils");
function loader(source) {
    // file-loader 需要返回一个路径
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
        content: source
    })
    console.log(source);
    console.log(filename);
    this.emitFile(filename, source); // 发射文件
    return `module.exports = "${filename}"`
}
loader.raw = true;
module.exports = loader;