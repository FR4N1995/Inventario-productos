import express from 'express';
import {home, formCrearProducto, guardarProducto, cambiarEstado, formEntradaproducto, guardarProductoEntrada, formSalidaproducto, guardarProductoSalida} from '../controllers/adminController.js';
import {historialHome, historialHomeEntredas, historialHomeSalidas} from '../controllers/historialController.js'
import protegerRutas from '../middleware/protegerRutas.js';
const router = express.Router();



// Rutas de administrador
router.get('/home', protegerRutas, home)
router.get('/crearProducto', protegerRutas, formCrearProducto)
router.post('/crearProducto', protegerRutas, guardarProducto)
router.put('/estado/:id', protegerRutas, cambiarEstado)
router.get('/entrada/:id', protegerRutas, formEntradaproducto)
router.post('/entrada/:id', protegerRutas, guardarProductoEntrada)
router.get('/salida/:id', protegerRutas, formSalidaproducto)
router.post('/salida/:id', protegerRutas, guardarProductoSalida)

router.get('/historial', protegerRutas, historialHome)
router.get('/historialEntradas', protegerRutas, historialHomeEntredas)
router.get('/historialSalidas', protegerRutas, historialHomeSalidas)
export default router;