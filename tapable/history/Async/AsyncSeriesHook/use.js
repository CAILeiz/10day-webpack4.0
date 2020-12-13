let { AsyncSeriesHook } = require("tapable"); // 异步串行
class Lesson {
    constructor() { 
        this.hooks = {
            arch: new AsyncSeriesHook(["name"])
        }
    }
    tap() {
        this.hooks.arch.tapAsync("vue", (name, cb) => {
            setTimeout(() => {
                console.log("vue", name);
                cb();
            }, 1000);
        });
        this.hooks.arch.tapAsync("node", (name, cb) => {
            setTimeout(() => {
                console.log("node", name);
                cb();
            }, 1000);
        });
    }
    start() {
        this.hooks.arch.callAsync("daleizi",function() {
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
