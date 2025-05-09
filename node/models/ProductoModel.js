import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Producto = sequelize.define('Producto', {
    idProducto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NombreProducto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    DescripcionProducto: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    StockProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PrecioProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Producto',
    timestamps: false
});

export default Producto;