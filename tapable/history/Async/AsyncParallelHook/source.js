class AsyncParallelHook {
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
        let finalCallback = args.pop(); // 拿出数组最后一位函数
        let index = 0, len = this.tasks.length;
        function done() {
            index++;
            index == len && finalCallback();
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
}
let hook = new AsyncParallelHook(["name"]);
hook.tapAsync("react", function(name, cb) {
    setTimeout(() => {
        console.log("react", name);
        cb()
    }, 1000);
});
hook.tapAsync("node", function(name, cb) {
    setTimeout(() => {
        console.log("node", name);
        cb()
    }, 1000);
});
hook.callAsync("daleizi", function() {
    console.log("end");
});