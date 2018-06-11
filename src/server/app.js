'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');

const api = require('./routes/movie');

const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(path.join(__dirname + '../../..' , 'public')));

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    filename: 'bundle.js',
    stats: {
        colors: true
    },
    historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log()
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api', api);

module.exports = app;