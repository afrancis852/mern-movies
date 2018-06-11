'use strict';

const request = require('request');

const config = require('../config');

function searchMovie(req, res) {
    let myForm = { key: config.imdbAPI.key, title: 'pacific rim', type: 'json'};
    request.post(config.imdbAPI.url, { form: myForm }, (err, httpResponse, body) => {
        if(err) return res.status(500).send({ message: `Error al realizar la petición a imdbAPI: ${err}` });

        res.json(body);
    });
};

module.exports = {
	searchMovie
};