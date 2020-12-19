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




## ast中的node
 {
  type: 'CallExpression',
  start: 10,
  end: 27,
  loc: SourceLocation {
    start: Position { line: 1, column: 10 },
    end: Position { line: 1, column: 27 }
  },
  callee: Node {
    type: 'Identifier',
    start: 10,
    end: 17,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      identifierName: 'require'
    },
    name: '__webpack_require__'
  },
  arguments: [
    Node {
      type: 'StringLiteral',
      start: 18,
      end: 26,
      loc: [SourceLocation],
      extra: [Object],
      value: './a.js'
    }
  ]
}