import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Usuario from './UsuarioModel.js';

const Pedidos = sequelize.define('Pedidos', {
    IdPedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    FechaPedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    IdUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    }
}, {
    tableName: 'Pedidos',
    timestamps: false
});

Pedidos.belongsTo(Usuario, { foreignKey: 'IdUsuario' });

export default Pedidos;