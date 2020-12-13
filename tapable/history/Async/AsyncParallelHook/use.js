let { AsyncParallelHook } = require("tapable");
// 异步的钩子(串行) 并行 需要等待所有并发的异步事件执行后再执行回调方法 同时发送多个请求 
// 注册事件的时候需要使用 tapAsync 这里面需要传2个参数 第二个参数是cb 所有的cb执行完才会执行最后的 callAsync里面的回调函数
class Lesson {
    constructor() { 
        this.hooks = {
            arch: new AsyncParallelHook(["name"])
        }
    }
    tap() {
        this.hooks.arch.tapAsync("vue", (name, cb) => {
            setTimeout(() => {
            console.log("vue", name); 
                cb()
            }, 1000);
        });
        this.hooks.arch.tapAsync("node", (name, cb) => {
            setTimeout(() => {
                console.log("node", name);
                cb()
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

