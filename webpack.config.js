import path from 'path'

export default {
    mode: 'development',
    entry: {
        cambiarEstado: './src/js/cambiarEstado.js',
        menuHamburguesa: './src/js/menuHamburguesa.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}