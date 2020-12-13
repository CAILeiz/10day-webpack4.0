// 只要监听函数返回一个非undefined的值 就会停止执行
class SyncWaterfallHook {
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
        console.log("...args", ...args);
        let [first, ...others] = this.taps;
        let ret = first(...args);
        others.reduce((a, b) => {
            return b(a);
        }, ret)
    }
}
let hook = new SyncWaterfallHook(["name"]);
hook.tap("vue", function(name) {
    console.log("vue", name);
    return "vue nice"
});
hook.tap("react", function(name) {
    console.log("react", name);
    return "react nice"
});
hook.tap("node", function(name) {
    console.log("node", name);
    return "node nice"
});
hook.call("daleizi", 'sjdk');