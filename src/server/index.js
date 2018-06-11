'use strict';

const mongoose = require('mongoose');

const config = require('./config');
const app = require('./app');

mongoose.connect(config.db, (err, res) => {
	if(err) {
		return console.log(`Error al conectar a la Base de Datos: ${err}`);
	}
	console.log('Se establecio una conexión con la Base de Datos movies');

	app.listen(config.port, () => {
		console.log(`El servidor esta corriendo en el puerto ${config.port}`);
	});
});