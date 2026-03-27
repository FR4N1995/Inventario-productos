import { DataTypes, Sequelize } from "sequelize";
import db from '../config/db.js';
import bcrypt from 'bcrypt';



const Usuarios = db.define('usuarios', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: null
    },
    admin: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permite que el campo esté vacío
        defaultValue: 0 
    }
}, {
    hooks: {
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
        }
    }
});

// metodos personalizados
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

export default Usuarios;