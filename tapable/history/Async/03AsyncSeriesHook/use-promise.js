let { AsyncSeriesHook } = require("tapable"); // 异步串行-promise版
class Lesson {
    constructor() { 
        this.hooks = {
            arch: new AsyncSeriesHook(["name"])
        }
    }
    tap() {
        this.hooks.arch.tapPromise("vue", name => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("vue", name);
                    resolve();
                }, 1000);
            })
            
        });
        this.hooks.arch.tapPromise("node", name => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("node", name);
                    resolve();
                }, 1000);
            })
            
        });
    }
    start() {
        this.hooks.arch.promise("daleizi").then(function() {
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
