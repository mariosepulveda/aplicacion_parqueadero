const path = require('path'); // importa path que ya esta instalada en node
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/index.js', //punto de entrada de la aplicacion 
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }, //salida del proyecto
    devServer:{
        port:3000
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    resolve:{
        extensions: ['.js']
    } // extensiones de los archivos con los que se trabaja en el proyecto
}