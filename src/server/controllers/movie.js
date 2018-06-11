'use strict';

const request = require('request');

const config = require('../config');

function searchMovie(req, res) {
    let url = buildUrl(req);

    request(url, (err, response, body) => {
        if(err) return res.status(500).send({ message: `Error al realizar la petición a OMDbAPI: ${err}` });

        res.json(body);
    });
};

function buildUrl(req) {
    let url = config.OMDbAPI.url + '?apikey=' + config.OMDbAPI.key + '&t=' + req.body.title;
    if(req.body.year) {
        url += '&y=' + req.body.year;
    }
    return url;
}

module.exports = {
    searchMovie
};