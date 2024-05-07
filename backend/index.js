const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();

//conexion con la BD
const mongoose = require('mongoose');

/*conection DB*/
mongoose.connect('mongodb://localhost/ags_db')
    .then(db => console.log('db is conected'))
    .catch(err => console.log(err))

//configuraciones de motor de plantillas
app.set('views','./views');
app.set("view engine","ejs");


//configurar rutas
const ruta1 = require('./routes/login');

app.use('/',ruta1);

//
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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



app.get('/api',validateToken,(req,res)=>{
    res.json({data:{
        name:'Alan Brito',
        age: 43,
        phone_number:'545 54544 33'
    }}); 
    
});


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

app.post('/auth',async (req,res)=> {
    //const {username,password} = req.body;
    //consultar y validar que existe username y password
    //const user = {username: username};

    //const accessToken = generateAccessToken(user);

    try {
        const user = await User.findOne({ username: req.body.username });
        console.log("body",req.body);
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        let validPassword = false;
        req.body.password === user.password ? validPassword = true : validPassword = false;

        //const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200);//.json({ accessToken })
        res.render("main");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
    

/**
 *     res.header('authorization',accessToken).json({
        message:'usuario autenticado',
        token:accessToken
    });
 */
     

});

function generateAccessToken(user){

    return jwt.sign(user,process.env.SECRET, {expiresIn:'5m'});
}

function validateToken(req,res,next){
    const accessToken = req.headers['authorization'];
    if(!accessToken){
        res.send('Acceso denegado');
    }

    jwt.verify(accessToken,process.env.SECRET,(err, user)=>{
        if(err){
            res.send('Acceso denegado, el token expiró');
        }else{
            next();
        }
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
