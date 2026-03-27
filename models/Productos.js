import { DataTypes } from "sequelize";
import db from "../config/db.js";




const Productos = db.define('productos', {
    nombre: {
            type: DataTypes.STRING,
            allowNull: false,
    },
    cantidad: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
});

export default Productos;