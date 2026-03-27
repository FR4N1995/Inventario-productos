import Historico from "../models/Historico.js"
import Productos from "../models/Productos.js"
import Usuarios from "../models/Usuario.js"
import {formatearFecha} from '../helpers/fecha.js'
import { where } from "sequelize"




const historialHome = async(req, res) =>{
  const { pagina: paginaActual } = req.query;

  const exprecionRegular = /^[1-9]$/;

  if (!exprecionRegular.test(paginaActual)) {
    return res.redirect("/administrador/historial?pagina=1");
  }
  // Limite y Offset para el paginador
  const limit = 5;
  const offset = paginaActual * limit - limit;

  const usuario = {
        admin : 1
    }
    
  const [historicos, total] = await Promise.all([
        Historico.findAll({
            limit: limit,     // <- Aplicar aquí
            offset: offset, 
            include: [
                {
                    model: Productos,
                    attributes: ['nombre', 'cantidad'],
                    as: 'producto'
                },
                {
                    model: Usuarios,
                    attributes: ['nombre', 'email'],
                    as: 'usuario'
                }

            ],
            order: [['createdAt', 'DESC']]  
        }),
        Historico.count(),
   ]);

      return res.render('historial/homeHistorial',{
        pagina: 'Total de Movimientos Realizados',
        historicos,
        usuario: req.usuario,
        total,
        limit,
        offset,
        paginas: Math.ceil(total / limit),
        paginaActual: Number(paginaActual),
        formatearFecha
    })

}
const historialHomeEntredas = async(req, res) =>{
  const { pagina: paginaActual } = req.query;

  const exprecionRegular = /^[1-9]$/;

  if (!exprecionRegular.test(paginaActual)) {
    return res.redirect("/administrador/historialEntradas?pagina=1");
  }
  // Limite y Offset para el paginador
  const limit = 5;
  const offset = paginaActual * limit - limit;

  const usuario = {
        admin : 1
    }
    
  const [historicos, total] = await Promise.all([
        Historico.findAll({
            where: {tipo: 'entrada'},
            limit: limit,     // <- Aplicar aquí
            offset: offset, 
            include: [
                {
                    model: Productos,
                    attributes: ['nombre', 'cantidad'],
                    as: 'producto'
                },
                {
                    model: Usuarios,
                    attributes: ['nombre', 'email'],
                    as: 'usuario'
                }

            ],
            order: [['createdAt', 'DESC']]  
        }),
        Historico.count({
            where: {tipo: 'entrada'}
        }),
   ]);
   console.log(historicos)

      return res.render('historial/homeHistorialEntrada',{
        pagina: 'Total de Movimientos Realizados',
        historicos,
        usuario: req.usuario,
        total,
        limit,
        offset,
        paginas: Math.ceil(total / limit),
        paginaActual: Number(paginaActual),
        formatearFecha
    })

}
const historialHomeSalidas = async(req, res) =>{
  const { pagina: paginaActual } = req.query;

  const exprecionRegular = /^[1-9]$/;

  if (!exprecionRegular.test(paginaActual)) {
    return res.redirect("/administrador/historialSalidas?pagina=1");
  }
  // Limite y Offset para el paginador
  const limit = 5;
  const offset = paginaActual * limit - limit;

  const usuario = {
        admin : 1
    }
    
  const [historicos, total] = await Promise.all([
        Historico.findAll({
            where: {tipo: 'salida'},
            limit: limit,     // <- Aplicar aquí
            offset: offset, 
            include: [
                {
                    model: Productos,
                    attributes: ['nombre', 'cantidad'],
                    as: 'producto'
                },
                {
                    model: Usuarios,
                    attributes: ['nombre', 'email'],
                    as: 'usuario'
                }

            ],
            order: [['createdAt', 'DESC']]  
        }),
        Historico.count({
            where: {tipo: 'salida'}
        }),
   ]);

      return res.render('historial/homeHistorialSalida',{
        pagina: 'Total de Movimientos Realizados',
        historicos,
        usuario: req.usuario,
        total,
        limit,
        offset,
        paginas: Math.ceil(total / limit),
        paginaActual: Number(paginaActual),
        formatearFecha
    })

}

export{
    historialHome,
    historialHomeEntredas,
    historialHomeSalidas
}