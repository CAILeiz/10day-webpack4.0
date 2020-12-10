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


## 编译js语法
babel-loader
@babel/core 里面有transform 转换方法
@babel/preset-env 需要配置 presets: ["@babel/preset-env"] 用来把es6转换为es5
@babel/plugin-transform-runtime依赖（安装在生产环境的）@babel/runtime  ==》 来处理es7的语法 只需要配置@babel/plugin-transform-runtime即可
生产@babel/polyfill给includes等语法打补丁 用的时候在所在文件引入即可

## 检验js语法  
eslint eslint-loader 配置enforce 让检验js的时候先检验eslint

## 全局变量引入问题
第一种 expose-loader暴漏到window上
{ // 引用jQuery的时候把jquery符号变成全局的方法
    test: require.resolve("jquery"),
    use: "expose-loader?$"
},
第二种 使用webpack的提供插件 providePlugin 给每个人提供一个$
第三种 CND 引入不打包


## 图片处理
图片处理
import logo from "./logo.png" 或者使用require引入图片
1. 在js中创建图片来引入
file-loader 默认会在内部生成一张图片 到build目录下
把生成的图片的名字返回回来 logo就是返回的图片名字
let img = new Image();
console.log(logo);
img.src = logo;
document.body.appendChild(img);
2. 在css引入 background： url("") 
css-loader会把url转换为 require(url)
3. <img src="" alt=""> 使用html-withimg-loader 帮我们解析html文件 编译图片中的src
使用url-loader进行base64转换



## 模块文件分类
1. css文件分类
new miniCssExtractPlugin({
    filename: "css/main.css" 
})
2. img图片文件分类
{
    loader: "url-loader",
    options: {
        limit: 1,
        outputPath: "/img/"
    }
}
3. 给引用的打包文件前面加一个域名 CND加速
3.1 给所有的打包文件加
output: {
    filename: "bundle.[hash:8].js", 
    path: path.resolve(__dirname, "build"),
    publicPath: "http://www.dalei.cn"   // 在所以引用打包的资源前面加公共路径
},
3.2 给图片单独加域名
{
    loader: "url-loader",
    options: {
        limit: 1,
        outputPath: "/img/",
        publicPath: "http://www.dalei.com" // 只会在图片前面加公共路径
    }
}


