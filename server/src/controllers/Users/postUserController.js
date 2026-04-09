const { User } = require('../../db.js');
const bcrypt = require('bcryptjs');

/**
 * Creates a new user with a hashed password.
 * 
 * @param {string} email - The user's email.
 * @param {string} password - The user's plain text password.
 * @returns {Promise<Object>} The created user instance.
 */
const postUserController = async (email, password) => {
    // 1. Basic validation & normalization
    if (!email || !password) {
        throw new Error("completar todos los campos necesarios");
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const plainPassword = String(password);

    if (plainPassword.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    // 2. Check if user already exists
    const user = await User.findOne({
        where: { email: normalizedEmail },
    });

    if (user) {
        throw new Error("usuario ya registrado");
    }

    // 3. Hash the password
    const saltRounds = 10;
    const password_hash = bcrypt.hashSync(plainPassword, saltRounds);

    // 4. Create the user
    const newUser = await User.create({
        email: normalizedEmail,
        password_hash: password_hash
    });

    // Don't return the hash in the response
    const userData = newUser.toJSON();
    delete userData.password_hash;
    return userData;
};

module.exports = { postUserController };