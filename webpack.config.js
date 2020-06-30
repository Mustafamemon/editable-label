const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');

var config = {
    mode: 'development',
    devtool: 'source-map',
    entry: [
        APP_DIR + '/index.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                include: APP_DIR,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: APP_DIR+'/css' ,
                use: [
                       'style-loader',
                       {
                         loader: 'css-loader',
                         options: {
                           modules: true,
                         },
                       },
                    ],
            }

        ]
    },
    externals: {
        "react": "react",
        "react-dom": "react-dom",
        "immutable": "immutable"
    },
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: true,
            skipFirstNotification: true,
        }),
    ]
};

module.exports = config;
