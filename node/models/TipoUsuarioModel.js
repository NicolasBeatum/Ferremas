import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const TipoUsuario = sequelize.define('TipoUsuario', {
    idTipoUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NombreTipoUsuario: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    DescripcionTipoUsuario: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'TipoUsuario',
    timestamps: false
});

export default TipoUsuario;