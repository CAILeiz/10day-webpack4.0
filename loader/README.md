## 什么是loader
webpack只能处理javaScript的模块,如果要要处理其他类型的文件; 需要使用loader进行转换;
loader是webpack中一个重要的概念,它是指用来将一段代码转换成另一段代码的webpack加载器

## 手写loader
## 自己写的loader三种调用方式
1. 使用绝对路径
{
    test: /\.js$/,
    use: path.resolve(__dirname, "loaderxxx")
}
2. 使用provideLoader中的alias(别名)
resolveLoader: { 
    // modules: ["node_modules", path.resolve(__dirname, "loaders")],
    alias: {  // 别名
        loader1: path.resolve(__dirname, "loaders", "loader1.js")
    }
}
3. 使用provideLoader中的modules(从左到右找)
resolveLoader: { 
    modules: ["node_modules", path.resolve(__dirname, "loaders")]
}

