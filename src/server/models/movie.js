'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = Schema({
    title: {
                type: String,
                required: 'El título de la película es obligatorio'
    },
    year: {
            type: Number,
            required: 'El año de la película es obligatorio'
    },
    runtime: Number,
    genders: [String],
    director: String,
    actors: [String],
    plot: String,
    poster: String,
    productions: [String]
});

module.exports = mongoose.model('Movie', MovieSchema);