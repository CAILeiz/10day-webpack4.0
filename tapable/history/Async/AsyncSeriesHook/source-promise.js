// 使用tapPromise注册异步串联
class AsyncSeriesHook {
    constructor(args) { // args 想当于["name"]
        this.tasks = [];
    }
    /* 
    * params name 事件名称
    * params task 事件
    */
   tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        let [first, ...others] = this.tasks;
        return others.reduce((p, n) => { // p是第一个收敛的第一个promise n是第二个promise
            return p.then(_ => n(...args)) // n() 返回的是一个promise
        }, first(...args))
    }
}
let hook = new AsyncSeriesHook(["name"]);
hook.tapPromise("vue", name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("vue", name);
            resolve();
        }, 1000);
    })
    
});
hook.tapPromise("node", name => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("node", name);
            resolve();
        }, 1000);
    })
    
});
hook.promise("daleizi").then(res => {
    console.log("end");
});