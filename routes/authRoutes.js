import express from 'express';
import {formLogin, autenticar, registrarUsuario, cerrarsesion} from '../controllers/usuarioConroller.js'

const router = express.Router();
// rutas login
router.get('/', formLogin);
router.post('/', autenticar);
router.post('/crearUsuario', registrarUsuario);

router.post('/cerrar-session', cerrarsesion);




export default router;