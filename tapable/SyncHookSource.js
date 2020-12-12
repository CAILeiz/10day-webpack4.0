class SyncHook {
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
            task(...args);
        }) 
    }
}
let hook = new SyncHook(["name"]);
hook.tap("vue", function(name) {
    console.log("vue", name);
});
hook.tap("vue", function(name) {
    console.log("vue", name);
});
hook.tap("node", function(name) {
    console.log("node", name);
});
hook.call("daleizi");