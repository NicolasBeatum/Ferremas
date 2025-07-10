import Usuario from '../models/UsuarioModel.js';
import sequelize from '../database/db.js';

const createAdminUser = async () => {
    const adminData = {
        RutUsuario: '12345678-9',
        CorreoUsuario: 'admin@ferremas.com',
        ContraseñaUsuario: 'admin123', // Contraseña en texto plano
        idTipoUsuario: 3, // Tipo de usuario administrador
    };

    try {
        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa');


        // Crear el usuario administrador
        await Usuario.create({
            RutUsuario: adminData.RutUsuario,
            CorreoUsuario: adminData.CorreoUsuario,
            ContraseñaUsuario: adminData.ContraseñaUsuario,
            idTipoUsuario: adminData.idTipoUsuario
        });

        console.log('¡Usuario administrador creado correctamente!');
        console.log('Email:', adminData.CorreoUsuario);
        console.log('Contraseña:', adminData.ContraseñaUsuario);
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    } finally {
        // Cerrar la conexión a la base de datos
        await sequelize.close();
    }
};

createAdminUser(); 