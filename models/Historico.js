import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";
import Productos from "./Productos.js";
import Usuarios from "./Usuario.js";




const Historico = db.define('historico', {
    tipo: {
      type: DataTypes.ENUM('entrada', 'salida'),
      allowNull: false
    },
     productoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Productos',
          key: 'id'
        }
      },
      cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
});

Historico.belongsTo(Productos, {foreignKey: "productoId"});
Historico.belongsTo(Usuarios, {foreignKey: "usuarioId"});
export default Historico;