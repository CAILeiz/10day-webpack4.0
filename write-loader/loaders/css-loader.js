// style-loader 主要处理的是background里面的url 把url分成三部分 中间的url("xxx") 转换成 url(require('xxx')) 最后一部分是其他的css
function loader(source) {
    console.log("css-loader", source);
    let reg = /url\((.+?)\)/g;
    let pos = 0;
    let current;
    let arr = ["let list = []"];
    while(current = reg.exec(source)) { // exec返回的是一个数组 第一个值是匹配到的内容url("xxx") 第二个值是()里面的内容 "xxx"
        let [matchUrl, g] = current;
        console.log(current);
        console.log(matchUrl, g);
        let last = reg.lastIndex - matchUrl.length; // reg.lastIndex匹配到的值的最后一位的下标 减去matchUrl的长度就是url前面的css代码
        console.log(reg.lastIndex);
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`); // 匹配到url后面的css代码
        pos = reg.lastIndex;
        // 把g替换成require的写法 ==> url(require("xxx"))
        arr.push(`list.push('url(' + require(${g})+')')`);
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
    arr.push(`module.exports = list.join('')`);
    console.log("arr", arr);
    return arr.join('\r\n');
}
module.exports = loader;
// current
// [
//     'url("./1.jpg")',
//     '"./1.jpg"',
//     index: 40,
//     input: 'body {\n  background: red;\n  background: url("./1.jpg");\n}\n',
//     groups: undefined
// ]


//arr [
//     'let list = []',
//     'list.push("body {\\n  background: red;\\n  background: ")',
//     `list.push('url(' + require("./1.jpg")+')')`,
//     'list.push(";\\n}\\n")',
//     "module.exports = list.join('')"
//   ]