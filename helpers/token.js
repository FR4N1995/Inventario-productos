import jwt from 'jsonwebtoken';

const generarJWT = (datos) =>{
   return jwt.sign({id: datos.id, nombre: datos.nombre, admin: datos.admin}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

export {
    generarJWT
}