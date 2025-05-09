import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import TipoUsuario from './TipoUsuarioModel.js';

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    RutUsuario: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    CorreoUsuario: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ContraseñaUsuario: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idTipoUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoUsuario,
            key: 'idTipoUsuario'
        }
    }
}, {
    tableName: 'Usuario',
    timestamps: false
});

Usuario.belongsTo(TipoUsuario, { foreignKey: 'idTipoUsuario' });

export default Usuario;