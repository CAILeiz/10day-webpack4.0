let { AsyncSeriesWaterfallHook } = require("tapable"); // 异步串行-promise版
class Lesson {
    constructor() { 
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(["name"])
        }
    }
    tap() {
        this.hooks.arch.tapAsync("vue", (name, cb) => {
            setTimeout(() => {
                console.log("vue", name);
                // cb(null, "result"); // cb第一个参数为null才会把参数传给下一个
                cb('error', "result"); 
            }, 1000);
        });
        this.hooks.arch.tapAsync("node", (data, cb) => {
            setTimeout(() => {
                console.log("node", data);
                cb();
            }, 1000);
        });
    }
    start() {
        this.hooks.arch.callAsync("daleizi", function() {
            console.log("end");
        })
    }
}
let lesson = new Lesson(["name"]);
lesson.tap();
lesson.start(); 
// 结果
// vue daleizi
// node daleizi
// end
