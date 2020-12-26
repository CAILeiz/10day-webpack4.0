function loader(source) {
    console.log("loader1~~~");
    return "1111";
}
loader.pitch = function () {
    console.log("loader1-pitch");
}
module.exports = loader;