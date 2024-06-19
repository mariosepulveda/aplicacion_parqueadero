const jwt = require('jsonwebtoken');
const config = require('../config');
const UsuariosModel = require('../models/User');


const users = async (req, res) => {
   try {
      const serviceRoute = req.route.path;
      if (serviceRoute === '/traerTodos') {
         //const {username,password} = req.body;
         let info = await UsuariosModel.find({});

         const token = jwt.sign({ id: info._id }, `${config.SECRET}`, { expiresIn: `${config.EXPIRES}` });

         if (info.lenth === 0) {
            return res.status(404).json({ status: 404, data: [], mensage: 'No hay datos!', token: token });
         } else {
            return res.status(200).json({ status: 200, data: info, token, token });
         }

      }else if(serviceRoute === '/traerId'){
         const {id}=req.body;
         let info = await UsuariosModel.findOne({_id:id});
         console.log('entro a traer Id',id,info);
      }

   } catch (error) {
      console.log("entro al catch", error);
      return res.status(500).json({ status_code: 500, message: [error.message] });
   }
}

module.exports = { UsuariosModel, users };