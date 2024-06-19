const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const cors = require('cors');
//import rutasAuth from './routes/Auth.routes.mjs';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const rutasAuth = require('./routes/Auth.routes.js');
const rutasUsers = require('./routes/Users.routes.js');

require('dotenv').config();

//conexion con la BD
const mongoose = require('mongoose');

/*conection DB*/

mongoose.connect(`${process.env.URL}`)
    .then(db => console.log('db is conected'))
    .catch(err => console.log(err))

//configuraciones de motor de plantillas
app.set('views','./views');
app.set("view engine","ejs");


//configurar rutas
app.use('/',require('./routes/login'));

app.use('/auth',rutasAuth);

app.use('/usuarios',rutasUsers);

//app.use('/traerTodos',require('./routes/panel'));


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
