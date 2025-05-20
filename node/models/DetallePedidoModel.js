import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const DetallePedido = sequelize.define('DetallePedido', {
    IdDetalle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdPedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'DetallePedido',
    timestamps: false
});

export default DetallePedido;