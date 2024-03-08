'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DescripcionSchema = Schema({
    nombre: String,
    fecha: String,
    ubicacion: String,
    participantes: Number
});

module.exports = mongoose.model('Descripcion', DescripcionSchema, 'Descripcion');
