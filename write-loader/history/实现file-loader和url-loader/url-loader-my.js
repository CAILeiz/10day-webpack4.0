let loaderUtils = require("loader-utils");
let mime = require("mime");
function loader(source) {
    console.log(mime.getType(this.resourcePath));
    let { limit } = loaderUtils.getOptions(this);
    // 如果图片大小小于limit会生成base64文件 否则生成图片
    if(limit && limit > source.length) {
        console.log(`"data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`);
        return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    } else {
        return require("./file-loader").call(this, source);
    }
}
loader.raw = true; // 将字符串转为buffer对象
module.exports = loader;