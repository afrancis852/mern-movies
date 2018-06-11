'use strict';

const config = require('./config');
const app = require('./app');

app.listen(config.port, () => {
    console.log(`El servidor esta corriendo en el puerto ${config.port}`);
});