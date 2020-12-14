let {merge} = require("webpack-merge");
console.log(merge);

let base = require("./webpack.base.js");

module.exports = merge(base, {
    mode: "development",
    devServer: {

    },
    devtool: "source-map"
})
