class AsyncParallelHook {
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
        let tasks = this.tasks.map(task => task(...args)); // 获取到所有注册事件返回的promise列表
        return Promise.all(tasks) // 最终返回一个promise等待.then()
    }
}
let hook = new AsyncParallelHook(["name"]);
hook.tapPromise("react", (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("vue", name);
            resolve()
        }, 1000);
    })
});
hook.tapPromise("node", (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("node", name);
            resolve()
        }, 1000);
    })
});
hook.promise("daleizi").then(res => {
    console.log("res", res);
    console.log("end");
});