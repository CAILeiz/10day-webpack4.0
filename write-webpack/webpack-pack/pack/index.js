const path = require("path");
let p1 = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
p1 = path.resolve('目录1', '目录2/目录3/', '../目录4/文件.gif');
p1 = path.parse('C:\\目录1\\目录2\\文件.txt');
console.log(p1);