// 执行的过程中除了第一个事件中的参数是传递进来的其余的都是上一个给的
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