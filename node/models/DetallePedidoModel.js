import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import Pedidos from './PedidosModel.js';
import Producto from './ProductoModel.js';

const DetallePedido = sequelize.define('DetallePedido', {
    IdDetalle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdPedido: {
        type: DataTypes.INTEGER,
        references: {
            model: Pedidos,
            key: 'IdPedido'
        }
    },
    IdProducto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'idProducto'
        }
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'DetallePedido',
    timestamps: false
});

DetallePedido.belongsTo(Pedidos, { foreignKey: 'IdPedido' });
DetallePedido.belongsTo(Producto, { foreignKey: 'IdProducto' });

export default DetallePedido;