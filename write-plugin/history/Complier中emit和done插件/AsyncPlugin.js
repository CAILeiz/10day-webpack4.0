const { rejects } = require("assert");
const { resolve } = require("path");

class AsyncPlugin {
    apply(compiler) {
        console.log(2);
        // 使用tapAsync异步
        compiler.hooks.emit.tapAsync("AsyncPlugin", (compliation, cb) => {
            setTimeout(() => {
                console.log("文件发射出来 等一下")
            }, 1000);
        })
        // 使用tapPromise异步
        compiler.hooks.emit.tapPromise("AsyncPlugin", (compliation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("再等一秒");
                    resolve();
                }, 1000);
            })
        })
    }
}
module.exports = AsyncPlugin;