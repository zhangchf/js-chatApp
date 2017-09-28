var path = require("path");
var fs = require("fs");

const nodeModules = fs.readdirSync("./node_modules").filter(d => d != ".bin");
function ignoreNodeModules(context, request, callback) {
    if (request[0] == ".") {
        return callback();
    }

    const module = request.split("/")[0];
    if (nodeModules.indexOf(module) != -1) {
        return callback(null, "commonjs " + request);
    }

    return callback();
}

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
        },
        externals: [ignoreNodeModules]

    };
    // --------------------
}

module.exports = createConfig(true);
