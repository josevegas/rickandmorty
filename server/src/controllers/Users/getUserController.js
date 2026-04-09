const { User } = require('../../db');
const bcrypt = require('bcryptjs');

/**
 * Retrieves a user by email and validates the password.
 * 
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password provided for validation.
 * @returns {Promise<boolean>} True if the credentials are valid, false otherwise.
 */
const getUserController = async (email, password) => {
    // Basic validation & normalization
    if (!email || !password) return false;
    const normalizedEmail = String(email).trim().toLowerCase();
    
    // 1. Buscamos el usuario por su email único
    const user = await User.findOne({ 
        where: { email: normalizedEmail } 
    });

    // 2. Si el usuario no existe
    if (!user) {
        console.log(`[AUTH] User not found for email: ${normalizedEmail}`);
        return false;
    }

    // 3. Verificamos la contraseña
    try {
        // user.password_hash es el hash almacenado en la DB
        const isMatch = bcrypt.compareSync(String(password), user.password_hash);
        console.log(`[AUTH] Attempt for ${normalizedEmail} - isMatch: ${isMatch}`);
        return isMatch;
    } catch (err) {
        console.error(`[AUTH] Error during compare: ${err.message}`);
        return false;
    }
};

module.exports = { getUserController };