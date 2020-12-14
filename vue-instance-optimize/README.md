## webpack打包优化 通过数据连接库
1. 在根目录创建 webpack.dll.js文件
const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    vue: [
      "vue",
      "axios",
      "echarts",
      "jquery",
      "vuex",
      "vue-router",
      "vue/dist/vue.esm.js"
    ]
  },
  output: {
    filename: "__dll__[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "__dll_[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "__dll_[name]",
      path: path.resolve(__dirname, "dist", "manifest.json")
    })
  ]
};

2. 在webpack.prod.js中plugins插件中加入
new webpack.IgnorePlugin(/\.\/locale/, /moment/),
new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, "../dist", "manifest.json")
})

3. 在index.hmtl中
<script src="__dll__vue.js"></script>

4. 在webpack.base.js中js编译中加入
exclude: /node_modules/

5. 在packjson.js中配置
"build": "webpack --config webpack.dll.js && node build/build.js"
启动 npm run build即可