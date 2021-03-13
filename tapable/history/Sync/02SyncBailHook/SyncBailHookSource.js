// // 只要监听函数返回一个非undefined的值 就会停止执行
// class SyncBailHook {
//     constructor(args) { // args 想当于["name"]
//         this.taps = [];
//     }
//     /* 
//     * params name 事件名称
//     * params task 事件
//     */
//     tap(name, task) {
//         this.taps.push(task);
//     }
//     call(...args) {
//         console.log(args);
//         let ret, index = 0; // ret指的是函数执行的结果 index指的是函数集合的下标
//         do {
//             ret = this.taps[index++](...args);
//         } while (ret === undefined && index < this.taps.length);
//     }
// }
// let hook = new SyncBailHook();
// hook.tap("vue", function(name) {
//     console.log("vue", name);
// });
// hook.tap("react", function(name) {
//     console.log("react", name);
//     return "undefinedd";
// });
// hook.tap("node", function(name) {
//     console.log("node", name);
// });
// hook.call("daleizi");


//  方法: tap注册 call执行  全局容器: taps
// 需求: 当执行任务返回值不为undefined时 阻断执行
class SyncBialHook {
    constructor() {
        this.taps = []
    }
    tap(name, task) {
        this.taps.push(task);
    }
    call(...args) {
        let len = this.taps.length;
        let index = 0;
        do {
            this.taps[index](...args);
        }while(this.taps[index]=== 'undefined' && index < len)
    }
}
const hook = new SyncBialHook();
hook.tap("vue", function(name) {
    console.log("vue", name);
})
hook.tap("react", function(name) {
    console.log("react", name);
    return 1;
})
hook.tap("react", function(name) {
    console.log("react", name);
})
hook.call("zl")