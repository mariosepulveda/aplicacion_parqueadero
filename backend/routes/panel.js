const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/auth',(req,res)=> {
    console.log('body',req.body);
    const {username,password} = req.body;
    //consultar y validar que existe username y password
    const user = {username: username};

    const accessToken = generateAccessToken(user);
    
    res.render("main");

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


module.exports = router;