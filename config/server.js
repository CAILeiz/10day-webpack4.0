const express = require("express");
let app = express();
let webpack = require("webpack");
let middle = require("webpack-dev-middleware");
let config = require("./webpack.config");
let compile = webpack(config);
app.use(middle(compile));
app.get("/api/user", middle, (req, res) => {
    res.json({name: "大雷子"})
})
app.listen(3000);