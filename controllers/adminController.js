import { check, validationResult } from "express-validator"
import Productos from '../models/Productos.js'
import {formatearFecha} from '../helpers/fecha.js'
import Historico from "../models/Historico.js"

const home = async(req, res) =>{
  const { pagina: paginaActual } = req.query;

  const exprecionRegular = /^[1-9]$/;

  if (!exprecionRegular.test(paginaActual)) {
    return res.redirect("/administrador/home?pagina=1");
  }
  // Limite y Offset para el paginador
  const limit = 5;
  const offset = paginaActual * limit - limit;

    const [productos, total] = await Promise.all([
        Productos.findAll(
            {
                 limit: limit,     // <- Aplicar aquí
                offset: offset,
            }
        ),
        Productos.count()
    ])

    return res.render('administrador/home',{
        pagina: 'Inventario',
        usuario: req.usuario,
        productos,
        total,
        limit,
        offset,
        paginas: Math.ceil(total / limit),
        paginaActual: Number(paginaActual),
        formatearFecha,
    })
}


const formCrearProducto = async(req, res) =>{
      /* verificar que quien vidita sea administrador */
  if (req.usuario.admin !== 1) {
    res.redirect("/");
  }
    return res.render('administrador/agregarProducto',{
        pagina: "Agregar Producto",
        usuario: req.usuario,
        datos: {}
    })
}

const guardarProducto = async(req, res) =>{
          /* verificar que quien vidita sea administrador */
  if (req.usuario.admin !== 1) {
    res.redirect("/");
  }

    await check("nombre").notEmpty().withMessage('El nombre es obligatorio').run(req);

    let errores = validationResult(req);

    // if(!resultado.isEmpty()){
    //     return res.render('administrador/agregarProducto',{
    //     pagina: "Agregar Producto",
    //     usuario: usuario,
    //     datos: req.body,
    //     errores: resultado.array()
    //     })
    // }
    if(!errores.isEmpty()){

        const listaErrores = errores.array().map((error) => error.msg).join("\n")


        return res.render('administrador/agregarProducto',{
        mensaje: {
            tipo: "error",
            titulo: "Todos los campos son obligatorios",
            texto: listaErrores
        },
        pagina: "Agregar Producto",
        usuario: req.usuario,
        datos: req.body,
        })
    }
    const {nombre} = req.body;
    const nombreminusculas = nombre.toLowerCase();

    const producto = await Productos.findOne({where: {nombre}});
    if(producto){
        return res.render('administrador/agregarProducto',{
        pagina: "Agregar Producto",
        usuario: req.usuario,
        datos: req.body,
        mensaje: {
            tipo: 'error',
            titulo: "Corrobora los datos",
            texto: "El producto ya existe"
        }
        })
    }

    try {
        await Productos.create({
           nombre: nombreminusculas
        })
        req.flash('mensaje', {
            tipo: "success",
            titulo: 'Registro exitoso',
            texto: "Producto Registrado Correctamente"
        });

        // REDIRECT a la misma pantalla (se refresca el formulario)
        return res.redirect(`/administrador/crearProducto`);


        
    } catch (error) {
        console.log(error)
    }

}

const cambiarEstado = async(req, res) =>{
    // console.log(req.params.id)
    const {id} = req.params;

    const producto = await Productos.findOne({where: {id}});

    producto.estado= !producto.estado;

    await producto.save();

    res.json({
        resultado: "Estado Actualizado"
    })
}

const formEntradaproducto = async(req, res) =>{
      const usuario = {
        admin : 1
    }

    return res.render('administrador/agregarEntrada', {
        pagina: 'Realizar entrada de Producto',
        datos: {},
        usuario: req.usuario
    });
}

const guardarProductoEntrada = async(req, res) =>{
       const usuario = {
        admin : 1
    }
    await check("cantidad").notEmpty().withMessage('La cantidad es obligatoria').isFloat({ min: 1 }).withMessage('Debe ser un número positivo mayor a 0')
        .run(req);
    await check("cantidad").isString().withMessage('Solo acepta numeros').run(req);

    let errores = validationResult(req)

    if(!errores.isEmpty()){
        const listaErrores = errores.array().map((err) => err.msg).join("\n")

        return res.render('administrador/agregarEntrada', {
        mensaje: {
            tipo: "error",
            titulo: "Todos los Campos son obligatorios",
            texto: listaErrores
        },
        pagina: 'Realizar entrada de Producto',
        datos: req.body,
        usuario: req.usuario,

        }); 
    }
    
    const {id} = req.params;
    const {cantidad} = req.body;

    const producto = await Productos.findOne({where: {id}});

    if (!producto || !producto.estado) {
        return res.render('administrador/agregarEntrada', {
        mensaje: {tipo: "error", titulo: "Verifica el producto", texto: "Producto no valido o inactivo"},
        pagina: 'Realizar entrada de Producto',
        datos: req.body,
        usuario: req.usuario,

        });  
    }

    // Convertir a número y sumar
    const cantidadActual = Number(producto.cantidad) || 0;
    producto.cantidad = cantidadActual + Number(cantidad);

    await producto.save();

    // Registrar el movimiento en historico
    await Historico.create({
        tipo: 'entrada',
        cantidad: Number(cantidad),
        productoId: producto.id,
        usuarioId: req.usuario.admin
        
    })
     // FLASH: mensaje de éxito
        req.flash('mensaje', {
            tipo: "success",
            titulo: 'Registro exitoso',
            texto: "Entrada registrada correctamente"
        });

        // REDIRECT a la misma pantalla (se refresca el formulario)
        return res.redirect(`/administrador/entrada/${id}`);

    // redireccionar a home
    res.redirect('/administrador/home');
}
const formSalidaproducto = async(req, res) =>{
      const usuario = {
        admin : 1
    }

    return res.render('administrador/agregarSalida', {
        pagina: 'Realizar salida de Producto',
        datos: {},
        usuario: req.usuario
    });
}
const guardarProductoSalida = async (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;



    await check("cantidad").notEmpty().withMessage('La cantidad es obligatoria').isFloat({ min: 1 }).withMessage('Debe ser un número positivo mayor a 0')
        .run(req);
    await check("cantidad").isString().withMessage('Solo acepta numeros').run(req);

    let errores = validationResult(req)

    if(!errores.isEmpty()){
        const listaErrores = errores.array().map((err) => err.msg).join("\n")

        return res.render('administrador/agregarSalida', {
        mensaje: {
            tipo: "error",
            titulo: "Todos los Campos son obligatorios",
            texto: listaErrores
        },
        pagina: 'Realizar entrada de Producto',
        datos: req.body,
        usuario: req.usuario,

        }); 
    }

    const producto = await Productos.findOne({ where: { id } });

    if (!producto || !producto.estado) {
        return res.render('administrador/agregarSalida', {
            mensaje: {
                tipo: 'error',
                titulo: 'Verifica el Producto',
                texto: 'Producto no valido o Inactivo'
            },
            datos: req.body,
            usuario: req.usuario
        });
    }

    const cantidadNumerica = Number(cantidad);
    const cantidadActual = Number(producto.cantidad) || 0;

    if (cantidadActual < cantidadNumerica) {
        return res.render('administrador/agregarSalida', {
            mensaje: { 
                tipo: 'error',
                titulo: "No hay suficiente inventario", 
                texto: "Revisa la cantidad del producto"
            },
            datos: req.body,
            usuario: req.usuario
        });
    }

    try {
        producto.cantidad = cantidadActual - cantidadNumerica;
        await producto.save();

        // Registrar movimiento
        await Historico.create({
            tipo: 'salida',
            cantidad: cantidadNumerica,
            productoId: producto.id,
            usuarioId: req.usuario.id
        });

        // FLASH: mensaje de éxito
        req.flash('mensaje', {
            tipo: "success",
            titulo: 'Registro exitoso',
            texto: "Salida registrada correctamente"
        });

        // REDIRECT a la misma pantalla (se refresca el formulario)
        return res.redirect(`/administrador/salida/${id}`);
    } catch (error) {
        console.log(error);
    }
};


export { 
    home,
    formCrearProducto,
    guardarProducto,
    cambiarEstado,
    formEntradaproducto,
    guardarProductoEntrada,
    formSalidaproducto,
    guardarProductoSalida
}