// 只要监听函数返回一个非undefined的值 就会停止执行
class SyncLoopHook {
    constructor(args) { // args 想当于["name"]
        this.taps = [];
    }
    /* 
    * params name 事件名称
    * params task 事件
    */
    tap(name, task) {
        this.taps.push(task);
    }
    call(...args) {
     this.taps.forEach(task => {
        let ret;
        do {
            ret = task(...args)
        } while (ret != undefined);
     })
    }
}
let hook = new SyncLoopHook(["name"]);
let total = 0;
hook.tap("vue", function(name) {
    console.log("vue", name);
    return ++total === 3 ? undefined : "继续学习"
});
hook.tap("react", function(name) {
    console.log("react", name);
});
hook.tap("node", function(name) {
    console.log("node", name);
});
hook.call("daleizi", 'sjdk');