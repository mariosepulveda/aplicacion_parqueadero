const jwt = require('jsonwebtoken');
//import bcrypt from 'bcrypt';
const mongoose = require('mongoose');
const config = require('../config');

const users = new mongoose.Schema({
    username:String,
    password:String,
    email:String
},{versionKey:false});

const UsuariosModel = mongoose.model('users',users);

const login = async (req,res) =>{
    try {
        const {username,password} = req.body;
        console.log("entro al try",req.body)
        var validacion = validar(username,'email',password);
        if(validacion == ''){
            let info = await UsuariosModel.findOne({username:username});
            if(info.length === 0 || !(password === info.password)){
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
            return res.status(200).render('main');//.json({status_code:200,data:usuario,message:'Acceso correcto'})
        }else{
            return res.status(400).json({status_code:400,message:validacion});
        }
    } catch (error) {
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