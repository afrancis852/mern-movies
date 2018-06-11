'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const List = mongoose.model('List');

const MovieSchema = Schema({
	title: String,
    year: Number,
    runtime: Number,
    genders: [String],
    director: String,
    actors: [String],
    plot: String,
    poster: String,
    productions: [String],
    list: { type: Schema.ObjectId, ref: "List" }
});

module.exports = mongoose.model('Movie', MovieSchema);