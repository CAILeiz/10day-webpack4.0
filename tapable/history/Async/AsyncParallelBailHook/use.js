let { AsyncParallelHook } = require("tapable");
// 异步的钩子(串行) 并行 需要等待所有并发的异步事件执行后再执行回调方法 同时发送多个请求 
// 注册事件的时候需要使用tapPromise 里面传值为(name 和 一个promise对象实例)
// 调用的时候使用promise(name, fn)
class Lesson {
    constructor() { 
        this.hooks = {
            arch: new AsyncParallelHook(["name"])
        }
    }
    tap() {
        this.hooks.arch.tapPromise("vue", (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("vue", name);
                    resolve()
                }, 1000);
            })
        });
        this.hooks.arch.tapPromise("node", (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("node", name);
                    resolve()
                }, 1000);
            })
        });
    }
    start() {
        this.hooks.arch.promise("daleizi").then( res => {
            console.log("end");
        })
    }
}
let lesson = new Lesson(["name"]);
lesson.tap();
lesson.start(); 

