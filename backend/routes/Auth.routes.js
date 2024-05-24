const express = require('express');
const rutas = express.Router();
const {login} = require('../Controllers/Atuth.controller.js');




rutas.post('/api/login',login);

module.exports = rutas;