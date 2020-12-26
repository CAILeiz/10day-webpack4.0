console.log("src-index");
// 在js文件中引入其他js文件 此时编译叫做行内编译 行内loader ******
// -! 不会让文件 再去通过pre + normal loader去处理
// ! 没有normal
// !! 处理inline-loader行内loader其余什么都你没有
// let str = require("-!inline-loader!./b.js")

// loader默认是由两部分组成的 pitch normal
// pitch是倒着来的 normal是webpack执行loader的顺序

class Person {
    constructor() {
        this.zuxian = "monkey"
    }
    getName() {
        return this.zuxian
    }
}
console.log(new Person().getName());
