#! /user/bin/env node
// 需要找到当前执行命令的路径 拿到webpack.config.js
let path = require("path");

// config配置文件是webpack.condig.js文件
let config = require(__dirname);
let Compiler = require("./lib/Compiler.js")
let compiler = new Compiler(config);
// 标识运行编译
compiler.run();