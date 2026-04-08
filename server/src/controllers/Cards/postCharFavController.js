const { User, Card } = require('../../db.js');
const { getCharByIdController } = require('./getCharByIdController.js');

const postCharFavController = async (id, email) => {
    // 1. Buscamos el usuario
    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // 2. Aseguramos que la carta esté en la BD
    // getCharByIdController maneja la lógica de buscar en DB y sincronizar con API si falta.
    const char = await getCharByIdController(id);

    if (!char) {
        throw new Error('El personaje no pudo ser recuperado desde la BD o la API.');
    }

    // 3. Agregamos el favorito
    await user.addCard(id);
    return 'Favorito agregado';
}

module.exports = { postCharFavController };