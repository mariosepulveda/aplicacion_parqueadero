const path = require('path'); // importa path que ya esta instalada en node

module.exports = {
    entry:'./src/index.js', //punto de entrada de la aplicacion 
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }, //salida del proyecto
    resolve:{
        extensions: ['.js']
    } // extensiones de los archivos con los que se trabaja en el proyecto
}