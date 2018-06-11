const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    context: path.join(__dirname, 'src'),
    entry: [
        './client/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: [
                    /node_modules/
                ],
                loader: 'babel-loader'
            }            
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    }
};