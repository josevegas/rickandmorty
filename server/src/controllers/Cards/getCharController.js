const axios = require('axios');
const URL = "https://rickandmortyapi.com/api/character";
const { Card } = require('../../db.js');

/**
 * Retrieves all characters, prioritizing the local database for performance.
 * If the local database is empty, it performs a full synchronization with the 
 * external Rick & Morty API, fetching all available pages in parallel and 
 * persisting them to ensured fast subsequent loads.
 * 
 * @returns {Promise<Array>} A list of characters from the local database or newly synced from API.
 * @throws {Error} If synchronization fails or the database is unreachable.
 */
const getCharController = async () => {
    try {
        // 1. Try to fetch from local database first
        let localCards = await Card.findAll();

        // 2. If we already have characters cached, return them immediately
        if (localCards && localCards.length > 0) {
            return localCards;
        }

        // 3. Initial Synchronization (Only first 10 pages for speed)
        const totalPagesToSync = 10;
        const pagesToFetch = Array.from({ length: totalPagesToSync }, (_, i) => i + 1);

        console.log(`[getCharController] Performing initial sync of first ${totalPagesToSync} pages`);

        // Fetch pages in parallel
        const responses = await Promise.all(
            pagesToFetch.map(page => axios.get(`${URL}?page=${page}`))
        );

        // Combine all character results
        const allExternalChars = responses.flatMap(res => res.data.results);

        // Map the API data structure to our local model schema
        const charactersToSave = allExternalChars.map(char => ({
            id: String(char.id),
            name: char.name,
            status: char.status,
            species: char.species,
            gender: char.gender,
            origin: char.origin.name,
            location: char.location.name,
            image: char.image
        }));

        // Persist characters to the local database
        await Card.bulkCreate(charactersToSave, { ignoreDuplicates: true });

        // Retrieve the final list from the DB
        return await Card.findAll();

    } catch (error) {
        console.error(`[getCharController] Error during initial synchronization:`, error.message);
        throw new Error(`Failed to retrieve characters: ${error.message}`);
    }
}

module.exports = { getCharController };

