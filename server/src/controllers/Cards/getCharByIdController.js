const axios = require('axios');
const URL = "https://rickandmortyapi.com/api/character";
const { Card } = require('../../db.js');

const getCharByIdController = async (id) => {
    // 1. Buscamos en la base de datos primero
    const charById = await Card.findByPk(id);
    console.log(charById)
    if (charById) {
        return charById;
    }

    // 2. Si no está en la DB, buscamos en la API externa
    try {
        const { data } = await axios.get(`${URL}/${id}`);
        const { name, status, species, gender, origin, location, image } = data;

        // 3. Lo guardamos en la base de datos para caché futuro
        const newChar = await Card.create({
            id,
            name,
            status,
            species,
            gender,
            origin: origin.name,
            location: location.name,
            image
        });

        return newChar;
    } catch (error) {
        console.error(`Error fetching from R&M API for ID ${id}:`, error.message);
        throw new Error(`Personaje con ID ${id} no encontrado en la API externa`);
    }
}

module.exports = { getCharByIdController };
