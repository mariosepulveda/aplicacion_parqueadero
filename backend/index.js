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
//app.use('/traerTodos',require('./routes/panel'));

//


/**
 * app.get('/',(req,res)=>{
    res.send(`
    <html">
    <head>
        <title>login_form</title>
    </head>
    <body>
        <form method="POST" action="/auth">
            Nombre de usuario: <input type="text" name="text"><br/>
            Password: <input type="password" name="password" id="input_pass"><br/>
            <input type="submit" value="Iniciar sesión" />
        </form>
    </body>
    </html>
    `);
});
 */


/**app.get('/traerTodos', async (req,res)=>{
    try {
        const transaction = await Transaction.find();
        console.log("body",req.body);
        res.status(200);//.json(user);//.json({ accessToken })
        res.render('transactions',{transaction});
        console.log(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});*/


/**
 * app.get('/login',(req,res)=>{
    res.send(`
    <html">
    <head>
        <title>login_form</title>
    </head>
    <body>
        <form method="POST" action="/auth">
            Nombre de usuario: <input type="text" name="text"><br/>
            Password: <input type="password" name="password" id="input_pass"><br/>
            <input type="submit" value="Iniciar sesión" />
        </form>
    </body>
    </html>
    `)
});
 */



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
