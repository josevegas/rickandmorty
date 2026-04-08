const axios = require('axios');
const URL = "https://rickandmortyapi.com/api/character";
const { Card } = require('../../db.js');

/**
 * Retrieves characters from the local database or external API if none exist.
 * Synchronizes multiple pages of data from the external API to ensure 
 * the local database is richly populated with initial characters.
 * 
 * @returns {Promise<Array>} A list of characters from the local database.
 * @throws {Error} If synchronization fails or API is unreachable.
 */
const getCharController = async () => {
    // 1. Buscamos primero lo que ya tenemos en nuestra base de datos local
    //let cards = await Card.findAll();

    // 2. Definimos el umbral de "datos completos" (ej. si tenemos al menos 100 personajes)
    // Si ya hay personajes suficientes en la DB local, los devolvemos directamente
    /* if (cards && cards.length >= 100) {
        return cards;
    } */

    // 3. Obtención masiva de datos (Sincronización inicial)
    try {
        // Vamos a sincronizar las primeras 5 páginas para tener una base robusta (100 personajes)
        const pagesToFetch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];

        // Ejecutamos las peticiones en paralelo para mayor eficiencia
        const responses = await Promise.all(
            pagesToFetch.map(page => axios.get(`${URL}?page=${page}`))
        );
        //const response = await axios.get(URL);
        //const allExternalChars = response.data.results;
        // Aplanamos los resultados de todas las páginas
        const allExternalChars = responses.flatMap(res => res.data.results);

        // Mapeamos los datos siguiendo el esquema de nuestro modelo
        const allCharacters = allExternalChars.map(element => ({
            id: String(element.id), // Aseguramos que sea STRING como pide el modelo
            name: element.name,
            status: element.status,
            species: element.species,
            gender: element.gender,
            origin: element.origin.name,
            location: element.location.name,
            image: element.image
        }));

        // Guardamos todo en nuestra base de datos local
        // Utilizamos ignoreDuplicates para evitar errores si algunos ya existían
        //await Card.bulkCreate(charactersToCreate, { ignoreDuplicates: true });
        //console.log(allCharacters)
        // Devolvemos la lista final desde nuestra persistencia local
        return allCharacters;
    } catch (error) {
        console.error(`Error during deep-sync from R&M API:`, error.message);
        // Si ya teníamos algo en la DB pero menos de 100, al menos devolvemos lo que hay
        //if (cards && cards.length > 0) return cards;
        throw new Error(`Error crítico al sincronizar la base de datos externa: ${error.message}`);
    }
}

module.exports = { getCharController };

