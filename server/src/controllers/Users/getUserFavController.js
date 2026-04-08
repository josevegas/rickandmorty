/**
 * Retrieves the favorite characters for a specific user by their email.
 * 
 * @param {string} email - The email of the user whose favorites are to be retrieved.
 * @returns {Promise<Array>} A list of matching character objects, or an empty array if none found.
 */
const { User, Card } = require('../../db.js');

const getUserFavController = async (email) => {
    // 1. Buscamos el usuario junto con sus cartas asociadas (favoritos)
    const userWithFavs = await User.findOne({
        where: { email },
        attributes: [], // No necesitamos datos del usuario, solo el join
        include: [{
            model: Card,
            through: {
                attributes: [], // Omitimos los atributos de la tabla pivot 'Favorite'
            }
        }]
    });

    // 2. Seguridad nula: si el usuario no existe o no tiene relación, retornamos vacío
    if (!userWithFavs || !userWithFavs.Cards) {
        return [];
    }

    // 3. Retornamos la lista de personajes (Cards)
    return userWithFavs.Cards;
}

module.exports = { getUserFavController };