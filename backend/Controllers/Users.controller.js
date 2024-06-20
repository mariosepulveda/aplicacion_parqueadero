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
            return res.status(404).json({ status: 404, data: [], message: 'No hay datos!', token});
         } else {
            return res.status(200)
                     .json({ 
                        status: 200,
                        data: info,
                        message:'Consulta Exitosa!',
                        token,
                     });
         }

      } else if (serviceRoute === '/traerId') {

         const { id } = req.body;
         let info = await UsuariosModel.findOne({ _id: id });
         const token = jwt.sign({ id: info._id }, `${config.SECRET}`, { expiresIn: `${config.EXPIRES}` });
         console.log('entro a traer Id', id, info);
         if (info.lenth === 0) {
            return res.status(404)
               .json({
                  status: 404,
                  data: [],
                  message: 'No hay datos!',
                  token,
               });
         } else {
            return res.status(200).
                     json({ 
                        status: 200,
                        data: info,
                        message:'Consulta Exitosa!',
                        token, 
                     });
         }
      }else if(serviceRoute === '/crear'){
            //insertOne() // insertMany()
      } else if (serviceRoute === '/modificar') {
                  //updateOne() // updateMany()
      } else if (serviceRoute === '/eliminar') {
            //UsuariosModel.deleteOne() //deleteMany()
      } else {
         console.log('entro al else');
         return res.status(404)
            .json({
               status: 404,
               data: [],
               mesage: 'No se ha encontrado',
               token: token,
            });
      }

   } catch (error) {
      console.log("entro al catch", error);
      return res.status(500).json({ status_code: 500, message: [error.message] });
   }
}

module.exports = { UsuariosModel, users };