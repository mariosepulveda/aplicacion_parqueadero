const jwt = require('jsonwebtoken');
//import bcrypt from 'bcrypt';
//const mongoose = require('mongoose');// no hace falta porque el modulo de mongoose se utiliza en el modelo de User
const config = require('../config');
const UsuariosModel = require('../models/User');

/**
 * se quito este codigo porque ahora el squema se trae desde el modelo de ./model/User
 * const users = new mongoose.Schema({
    username:String,
    password:String,
    email:String
},{versionKey:false}); */

//const UsuariosModel = mongoose.model('users',users);

const login = async (req,res) =>{
    try {
        const {username,password} = req.body;
        console.log("entro al try",req.body);
        var validacion = validar(username,'email',password);
        if(validacion == ''){
            let info = await UsuariosModel.findOne({username:username});
            console.log('info',info);
            if(info == null || info.length == 0 || !(password === info.password)){
                return res.status(404).json({status:404,errors:['Usuario no existe']});
            }

            console.log('expires in ',`${config.EXPIRES}`,`${config.SECRET}`);
            const token = jwt.sign({id:info._id},`${config.SECRET}`,{
                expiresIn:`${config.EXPIRES}`
            });

            const usuario = {
                id:info._id,
                username:info.username,
                email:info.email,
                password:info.password,
                token:token
            }

            const responseType = req.headers['content-type'];
            console.log('headers',responseType);
            if(responseType === 'application/json'){
                return res.status(200).json({status_code:200,data:usuario,message:'Acceso correcto'})
            }else {
                return res.render('main');
            }
            //
        }else{
            return res.status(400).json({status_code:400,message:validacion});
        }
    } catch (error) {
        console.log("entro al catch",error);
        return res.status(500).json({status_code:500,message:[error.message]})
    }   
}

const validar = (nombre,correo,password) => {
    var errors = [];
    console.log("entro ",nombre,correo,password);

    if(nombre === undefined || nombre.trim() === ''){
        errors.push('El nombre no debe estar vacío')
    }
    if(correo === undefined || correo.trim() === ''){
        errors.push('El correo no debe estar vacío');
    }
    if(password === undefined || password.trim() === '' || password.length < 4){
        errors.push('La contraseña No debe estar vacía y debe tener minimo 4 caracteres')
    }

    return errors;

}

module.exports = {UsuariosModel,login};