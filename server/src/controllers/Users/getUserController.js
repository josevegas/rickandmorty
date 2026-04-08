/**
 * Retrieves a user by email and validates the password.
 * 
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password provided for validation.
 * @returns {Promise<boolean>} True if the credentials are valid, false otherwise.
 */
const { User } = require('../../db');

const getUserController = async (email, password) => {
    // 1. Buscamos el usuario por su email único
    const user = await User.findOne({ 
        where: { email } 
    });

    // 2. Si el usuario no existe, rechazamos el acceso inmediatamente
    if (!user) {
        return false;
    }

    // 3. Verificamos la contraseña
    if (user.password === password) {
        return true;
    }

    return false;
};

module.exports = { getUserController };