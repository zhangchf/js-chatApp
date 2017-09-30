var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const dirname = path.resolve("./");

// These vendor modules will be compiled into a separate js file.
const vendorModules = [ "jquery", "lodash"];

function createConfig(isDebug) {
    if (isDebug == undefined || isDebug == null) {
        isDebug = true;
    }

    const devTool = isDebug ? "eval-source-map" : "source-map";
    const plugins = [new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" })];

    const cssLoader = { test: /\.css$/, loader: "style-loader!css-loader" };
    const sassLoader = { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" };
    const appEntry = ["./src/client/application.js"];

    if (!isDebug) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true}));
        plugins.push(new ExtractTextPlugin("[name].css"));

        cssLoader.loader = ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        });
        sassLoader.loader = ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
        });    
    } else {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        // This javascript will enable hot module replacement.
        appEntry.splice(0, 0, "webpack-hot-middleware/client");
    }

    // ----------------
    // WEBPACK CONFIG
    return {
        devtool: devTool,
        entry: {
            application: appEntry,
            vendor: vendorModules
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
                { test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)$/, loader: "url-loader?limit=512" },
                cssLoader,
                sassLoader
            ]
        },
        plugins: plugins
    };
    // ----------------
}

module.exports = createConfig;