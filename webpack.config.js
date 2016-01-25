/**
 * Wofh Tools Client script.
 *
 * @since        20.01.2016 16:04
 * @author       delphinpro delphinpro@gmail.ru
 * @copyright    copyright (C) 2016 delphinpro
 * @license      Licensed under the MIT license
 */

const webpack = require("webpack");
const headerString = require("./source/header.js");
const NODE_ENV = process.env.NODE_ENV || "development";
const DEV_BUILD = process.env.DEV_BUILD || false;
const DEV_MODE = NODE_ENV == "development";

var plugins = [
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        DEV_MODE: JSON.stringify(DEV_MODE)
    }),
    new webpack.optimize.DedupePlugin()
];

if (NODE_ENV == "production") {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true
        }
    }));

    plugins.push(new webpack.BannerPlugin(headerString, {
        raw: true
    }));
}

module.exports = {
    watch       : DEV_MODE && (DEV_BUILD === false),
    watchTimeout: {
        aggregateTimeout: 100
    },
    devtool     : DEV_MODE ? "cheap-inline-module-source-map" : null,

    entry  : "./source/wofh-tools.user.js",
    resolve: {
        modulesDirectories: [
            "./source/modules",
            "node_modules"
        ]
    },
    output : {
        path    : "./dist",
        filename: DEV_MODE ? "wofh-tools.dev.user.js" : "wofh-tools.user.js"
    },
    node: {
        fs: "empty"
    },
    module : {
        loaders: [{
            test  : /\.twig$/,
            loader: "twig-loader"
        }, {
            test  : /\.css$/,
            loader: "style!css!autoprefixer?browsers=last 2 versions"
        },{
            test  : /\.js$/,
            loader: "babel?presets[]=es2015"
        }, {
            test: /\.(png)$/,
            loader: "url?name=[path][name].[ext]"
        }]
    },
    plugins: plugins
};
