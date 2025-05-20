import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Usuario from './UsuarioModel.js';
import DetallePedido from './DetallePedidoModel.js';


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
    },
    TransbankToken: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    EstadoPago: {
        type: DataTypes.ENUM('pendiente', 'pagado', 'fallido'),
        defaultValue: 'pendiente'
    },
    TransbankUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'Pedidos',
    timestamps: false
});


export default Pedidos;