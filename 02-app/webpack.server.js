var path = require("path");

function createConfig(isDebug) {
    // --------------------
    // WEBPACK CONFIG
    return {
        target: "node",
        devtool: "source-map",
        entry: "./src/server/server.js",
        output: {
            path: path.join(__dirname, "build"),
            filename: "server.js"
        },
        resolve: {
            alias: {
                shared: path.join(__dirname, "src", "shared")
            }
        },
        module: {
            loaders: [
                { test: /\.js$/, loader: "babel-loader", exclude: /node-modules/ },
                { test: /\.js$/, loader: "eslint-loader", exclude: /node-modules/ },
            ]
        }

    };
    // --------------------
}

module.exports = createConfig(true);
