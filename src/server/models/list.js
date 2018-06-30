'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ListSchema = Schema({
    name: {
            type: String,
            required: 'El nombre de la lista es obligatorio',
            minlength: [5, 'El nombre de la lista debe tener una longitud mínima de 5 caracteres'],
            maxlength: [20, 'El nombre de la lista debe tener una longitud máxima de 35 caracteres']
    },
    description: String,
    movie: [{ type: Schema.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('List', ListSchema);