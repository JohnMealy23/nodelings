const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        // new HtmlWebpackPlugin({template: './src/index.html'})
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["airbnb", "stage-2"]
                }
            }
        ]
    }
};

// const path = require('path');
// const webpack = require('webpack');
// module.exports = {
//     entry: './reactStartup.js',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     resolve: {
//         modules: [
//             path.resolve('./'),
//             path.resolve('./node_modules'),
//         ]
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader',
//                 query: {
//                     presets: ["airbnb", "stage-2"]
//                 }
//             }
//         ]
//     }
// };

