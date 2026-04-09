const { sequelize, User } = require('./db.js');
const bcrypt = require('bcryptjs');

async function migrate() {
    console.log('--- Iniciando migración de contraseñas ---');
    const queryInterface = sequelize.getQueryInterface();
    const tableInfo = await queryInterface.describeTable('Users');

    // 1. Agregar columna password_hash si no existe
    if (!tableInfo.password_hash) {
        console.log('Agregando columna password_hash...');
        await queryInterface.addColumn('Users', 'password_hash', {
            type: require('sequelize').DataTypes.STRING,
            allowNull: true, // Permitir nulo temporalmente durante la migración
        });
    }

    // 2. Migrar datos si existe la columna password antigua
    if (tableInfo.password) {
        console.log('Migrando contraseñas de texto plano a hashes...');
        const users = await sequelize.query('SELECT id, password FROM "Users" WHERE password IS NOT NULL', {
            type: sequelize.QueryTypes.SELECT
        });

        for (const user of users) {
            console.log(`Hasheando contraseña para el usuario ID: ${user.id}`);
            const hash = await bcrypt.hash(user.password, 10);
            await sequelize.query('UPDATE "Users" SET password_hash = ? WHERE id = ?', {
                replacements: [hash, user.id],
                type: sequelize.QueryTypes.UPDATE
            });
        }

        // 3. Eliminar la columna antigua
        console.log('Eliminando columna password antigua...');
        await queryInterface.removeColumn('Users', 'password');
    }

    // 4. Asegurar que password_hash no sea nulo después de la migración
    console.log('Ajustando restricciones de password_hash...');
    await queryInterface.changeColumn('Users', 'password_hash', {
        type: require('sequelize').DataTypes.STRING,
        allowNull: false,
    });

    console.log('--- Migración completada con éxito ---');
}

migrate()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Error durante la migración:', err);
        process.exit(1);
    });
