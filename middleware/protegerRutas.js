import jwt from 'jsonwebtoken';
import Usuarios from '../models/Usuario.js';


const protegerRutas = async (req, res, next) => {

    const {_token} = req.cookies;
    if(!_token){
        return res.redirect('/');
    }

    try {
        const decode = jwt.verify(_token, process.env.JWT_SECRET);
        const usuario = await Usuarios.findByPk(decode.id);
        if(usuario){
            req.usuario = usuario;
        }else {
            return res.redirect('/');
        }
        return next()
    } catch (error) {
        return res.clearCookie('_token').redirect('/');

    }
}

export default protegerRutas;