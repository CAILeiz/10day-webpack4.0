## webpack手写

## 把自己创的包映射到全局
1. 在packjson.js中写入
"bin": {
    "zf-pack": "./bin/zl-pack.js"
}
2. npm link
C:\Users\tcsc6\AppData\Roaming\npm\zf-pack -> C:\Users\tcsc6\AppData\Roaming\npm\\my-bundle\bin\zl-pack.js
C:\Users\tcsc6\AppData\Roaming\npm\node_modules\my-bundle -> C:\Users\tcsc6\Desktop\myGithub\10day-webpack4.0\write-webpack\my-bundle

## 把全局的包映射到本地
npm link zf-pack