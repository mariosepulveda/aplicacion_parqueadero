const express = require('express');
const rutas = express.Router();
const {users} = require('../Controllers/Users.controller.js');


rutas.get('/traerTodos',users);
rutas.get('/traerId',users);

module.exports = rutas;