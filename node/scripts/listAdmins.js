import Usuario from '../models/UsuarioModel.js';
import sequelize from '../database/db.js';

const listAdminUsers = async () => {
    try {
        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa');

        // Buscar todos los usuarios administradores
        const adminUsers = await Usuario.findAll({
            where: { idTipoUsuario: 3 },
            attributes: ['idUsuario', 'RutUsuario', 'CorreoUsuario', 'idTipoUsuario']
        });

        if (adminUsers.length === 0) {
            console.log('No se encontraron usuarios administradores en la base de datos.');
        } else {
            console.log(`Se encontraron ${adminUsers.length} usuario(s) administrador(es):\n`);
            
            adminUsers.forEach((user, index) => {
                console.log(`${index + 1}. Usuario Administrador:`);
                console.log(`   ID: ${user.idUsuario}`);
                console.log(`   RUT: ${user.RutUsuario}`);
                console.log(`   Email: ${user.CorreoUsuario}`);
                console.log('');
            });
        }

    } catch (error) {
        console.error('Error al listar los usuarios administradores:', error);
    } finally {
        // Cerrar la conexión a la base de datos
        await sequelize.close();
    }
};

listAdminUsers(); 