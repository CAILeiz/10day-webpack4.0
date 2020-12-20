
class Entry {
    apply(compiler) {
        compiler.hooks.entry.tap("entry", _ => {
            console.log("entry");
        })
    }
}

class Run {
    apply(compiler) {
        compiler.hooks.run.tap("run", _ => {
            console.log("run");
        })
    }
}
class Compile {
    apply(compiler) {
        compiler.hooks.compile.tap("compile", _ => {
            console.log("compile");
        })
    }
}
class AfterCompile {
    apply(compiler) {
        compiler.hooks.afterCompile.tap("afterCompile", _ => {
            console.log("afterCompile");
        })
    }
}
class AfterPlugins {
    apply(compiler) {
        compiler.hooks.afterPlugins.tap("afterPlugins", _ => {
            console.log("afterPlugins");
        })
    }
}
class Emit {
    apply(compiler) {
        compiler.hooks.emit.tap("emit", _ => {
            console.log("emit");
        })
    }
}
class Done {
    apply(compiler) {
        compiler.hooks.done.tap("done", _ => {
            console.log("done");
        })
    }
}
const { compile } = require("ejs");
let path = require("path");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, "loaders", "style-loader"),
                    path.resolve(__dirname, "loaders", "less-loader")
                ]
            }
        ]
    },
    plugins: [
        new Entry(),
        new Run(),
        new Compile(),
        new AfterCompile(),
        new AfterPlugins(),
        new Emit(),
        new Done()
    ]
}