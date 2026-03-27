1.1) Describe el funcionamiento general de la sentencia JOIN.
 Es una operacion en SQL que permite combinar filas de dos o mas tablas basandose en una condicion
 de relacion entre las tablas.

1.2) ¿Cuáles son los tipos de JOIN y cuál es el funcionamiento de los mismos?
    INNER JOIN
        devuelve solo las filas donde hay coincidencia
    LEFT JOIN
        devuelve todos los registros de la tabla izquierda y incluye los resgistros 
        que conciden con la tabla derecha y los registros sin coincidencia muestra null
    Right JOIN
        funciona al reves devuelve todos los registros de la tabla Derecha y incluye los resgistros 
        que conciden con la tabla izquierda y los registros sin coincidencia muestra null
    FULL JOIN
        devuelve todos los registros cuando hay coincidencia en cualquiera de las tablas, muestra null
        para los campos sin coincidencia

1.3) ¿Cuál el funcionamiento general de los TRIGGER y qué propósito tienen?
    su funcionamiento general es ejecutarse cuando ocurre un evento en especifico en un 
    tabla como un insert, update o delete. Tiene varios propositos de acuerdo a lo que necesites
    como por ejemplo: Seguridad adicional, integracion de la base de datos y sincronizacion.

1.4) ¿Qué es y para qué sirve un STORED PROCEDURE?
    es un bloque de codigo SQL predifinido, sirve para mejorar el rendimiento y para
    mas seguridad



1.5) Traer todos los productos que tengan una venta
SELECT DISTINCT p.*
FROM productos p
INNER JOIN ventas v ON p.idProducto = v.idProducto;

1.6) Traer todos los productos que tengan ventas y la cantidad total de productos vendidos.
SELECT 
    p.idProducto,
    p.nombre,
    p.precio,
    SUM(v.cantidad) AS cantidad_total_vendida,
    COUNT(v.idVentas) AS numero_de_ventas
FROM 
    productos p
INNER JOIN 
    ventas v ON p.idProducto = v.idProducto
GROUP BY 
    p.idProducto, p.nombre, p.precio
ORDER BY 
    cantidad_total_vendida DESC;

1.7) Traer todos los productos (independientemente de si tienen ventas o no) y la suma total ($) vendida por
producto

SELECT 
    p.idProducto,
    p.nombre,
    p.precio,
    COALESCE(SUM(v.cantidad * p.precio), 0) AS total_vendido_dinero,
    COALESCE(SUM(v.cantidad), 0) AS cantidad_total_vendida,
    COUNT(v.idVentas) AS numero_de_ventas
FROM 
    productos p
LEFT JOIN 
    ventas v ON p.idProducto = v.FKidProducto
GROUP BY 
    p.idProducto, p.nombre, p.precio
ORDER BY 
    total_vendido_dinero DESC;
