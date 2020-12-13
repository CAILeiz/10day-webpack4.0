const { ids } = require("webpack");

// 使用tapAsync注册异步串联
class AsyncSeriesHook {
    constructor(args) { // args 想当于["name"]
        this.tasks = [];
    }
    /* 
    * params name 事件名称
    * params task 事件
    */
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let next = (err, data) => {
            let task = this.tasks[index];
            if(!task) return finalCallback();
            if(index == 0) {
                task(...args, next);
            } else {
                task(data, next);
            }
            index++
        }
        next();
    }
}
let hook = new AsyncSeriesHook(["name"]);
hook.tapAsync("vue", (name, cb) => {
    setTimeout(() => {
        console.log("vue", name);
        cb(null, "reslut");
    }, 1000);
});
hook.tapAsync("node", (data, cb) => {
    setTimeout(() => {
        console.log("node", data);
        cb(null);
    }, 1000);
});
hook.callAsync("daleizi", res => {
    console.log("end");
});