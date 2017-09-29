var path = require("path");

const dirname = path.resolve("./");

function createConfig(isDebug) {
    const devTool = isDebug ? "eval-source-map" : "source-map";
    const plugins = [];

    const cssLoader = { test: /\.css$/, loader: "style-loader!css-loader" };
    const sassLoader = { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" };
    const appEntry = ["./src/client/application.js"];

    // ----------------
    // WEBPACK CONFIG
    return {
        devtool: devTool,
        entry: {
            application: appEntry
        },
        output: {
            path: path.join(dirname, "public", "build"),
            filename: "[name].js",
            publicPath: "/build/"
        },
        resolve: {
            alias: {
                shared: path.join(dirname, "src", "shared")
            }
        },
        module: {
            loaders: [
                { test: /\.js$/, loader: "babel-loader", exclude: /node_modeules/ },
                { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ },
                { test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/, loader: "url-loader?limit=512" },
                cssLoader,
                sassLoader
            ]
        }
    };
    // ----------------
}

module.exports = createConfig;