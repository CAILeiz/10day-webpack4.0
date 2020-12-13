// 只要监听函数返回一个非undefined的值 就会停止执行
class SyncBailHook {
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
        let ret, index = 0; // ret指的是函数执行的结果 index指的是函数集合的下标
        do {
            ret = this.taps[index++](...args);
        } while (ret === undefined && index < this.taps.length);
    }
}
let hook = new SyncBailHook(["name"]);
hook.tap("vue", function(name) {
    console.log("vue", name);
});
hook.tap("react", function(name) {
    console.log("react", name);
});
hook.tap("node", function(name) {
    console.log("node", name);
});
hook.call("daleizi");