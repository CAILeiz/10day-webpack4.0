//  同步执行不返回undefined的监听函数会多次执行 直到返回undefined
let { SyncLoopHook } = require("tapable");
class Lesson {
    constructor() { 
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(["name"])
        }
    }
    tap() {
        this.hooks.arch.tap("node", (name) => {
            console.log("node", name);
            return ++this.index === 3 ? undefined : '继续学'
        });
        this.hooks.arch.tap("vue", (data) => {
            console.log("vue", data);
        });
    }
    start() {
        this.hooks.arch.call("daleizi")
    }
}
let lesson = new Lesson(["name"]);
lesson.tap();
lesson.start(); // 启动钩子
// 输出 
// node daleizi
// node daleizi
// node daleizi
// vue daleizi

