-- Eliminar tablas si existen (en orden correcto por dependencias de FK)
DROP TABLE IF EXISTS `historicos`;
DROP TABLE IF EXISTS `productos`;
DROP TABLE IF EXISTS `usuarios`;

-- Crear tabla de usuarios
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `nombre` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `admin` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Crear tabla de productos
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_bin NOT NULL,
  `cantidad` int NOT NULL DEFAULT '0',
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Crear tabla de históricos
CREATE TABLE `historicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('entrada','salida') COLLATE utf8_bin NOT NULL,
  `cantidad` int NOT NULL DEFAULT 1,
  `productoId` int DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productoId` (`productoId`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `historicos_ibfk_1` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `historicos_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Insertar datos iniciales de usuarios
--si insertas estos dos usuarios la contraseña es:1234567
INSERT INTO `usuarios` (`id`, `email`, `nombre`, `password`, `admin`, `createdAt`, `updatedAt`) VALUES
(1, 'castores@gmail.com', 'Grupo Castores', '$2b$10$rZht3WShTl8e6QAoaPxeD.iNiPP82r.Fr4ymzDqbFB59.CklVbnoO', 1, '2025-05-13 04:05:23', '2025-05-13 04:05:23'),
(2, 'almacen@gmail.com', 'Almacenista', '$2b$10$A4jSK9bwLZ1kWWx6fe6kvOBZ.Lz6b1fdp5cC7OxoR7/RvfUoHANy2', 0, '2025-05-13 04:30:59', '2025-05-13 04:30:59');

-- desde Postman
/* 
tipo: POST
url:http://localhost:5000/crearUsuario

json{
    nombre:Almacenista
    email:almacen@gmail.com
    password:1234567
    admin:0  
}


*/
