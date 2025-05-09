import Sequelize from 'sequelize';

const db = new Sequelize("ferremas", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
});

export default db;