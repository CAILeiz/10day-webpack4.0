# 10day-webpack4.0
10天搞定webpack4.0

## webpack安装
- 安装本地的webpack 
webpack webpack-cli -D (因为上线时候不需要)

## 打包的时候 找node_module/bin/webpack.cmd 
文件中说如果目录中存在\node.exe 则执行\node.exe 
否则执行node_module\webpack\bin\webpack.js
在webpack.js文件中说必须首先安装 webpack-cli

## webpack可以进行0配置
-打包工具->输出后的结果
（js模块)-打包(支持我们的js的模块化)
*****
根目录中新建一个src 下面有index.js 和 a.js
在命令行中执行npx webpack
会在根目录生成一个dist文件 下面有main.js

## 手动配置webpack
默认配置文件的名字 webpack.config.js
******
当我们把默认文件改成webpack.config.my.js 想要运行得 npx webpack --config XXX
npx webpack --config  webpack.config.my.js
或者直接在packjson中配置scripts
"scripts": {
    "build": "webpack --config webpack.config.my.js"
},
如果你在scripts中只写了webpack 想在命令行中执行文件则
npm run build -- --config webpack.config.my.js
相当于执行 webpack --config webpack.config.my.js "--config" "webpack.config.my.js"


## loader的作用
babel-loader
@babel/core 里面有transform 转换方法
@babel/preset-env 需要配置 presets: ["@babel/preset-env"] 用来把es6转换为es5

