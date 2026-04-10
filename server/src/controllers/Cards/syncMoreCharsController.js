const axios = require('axios');
const URL = "https://rickandmortyapi.com/api/character";
const { Card } = require('../../db.js');

/**
 * Synchronizes 5 additional pages of characters from the Rick & Morty API.
 * Detects the current progress based on the number of characters in the database
 * and fetches the next chunk of data.
 * 
 * @returns {Promise<Array>} The newly added characters.
 */
const syncMoreCharsController = async () => {
    try {
        const count = await Card.count();
        // Each page has 20 characters. 
        const nextPageToFetch = Math.floor(count / 20) + 1;

        // Fetch first page just to check total pages
        const firstRes = await axios.get(URL);
        const totalPages = firstRes.data.info.pages;

        if (nextPageToFetch > totalPages) {
            return []; // No more characters to fetch
        }

        // We will fetch 5 pages at a time
        const endPage = Math.min(nextPageToFetch + 4, totalPages);
        const pagesToFetch = [];
        for (let i = nextPageToFetch; i <= endPage; i++) {
            pagesToFetch.push(i);
        }

        console.log(`[syncMoreChars] Syncing pages ${nextPageToFetch} to ${endPage}`);

        const responses = await Promise.all(
            pagesToFetch.map(page => axios.get(`${URL}?page=${page}`))
        );

        const newExternalChars = responses.flatMap(res => res.data.results);

        const charactersToSave = newExternalChars.map(char => ({
            id: String(char.id),
            name: char.name,
            status: char.status,
            species: char.species,
            gender: char.gender,
            origin: char.origin.name,
            location: char.location.name,
            image: char.image
        }));

        await Card.bulkCreate(charactersToSave, { ignoreDuplicates: true });

        // Return all characters after sync to update the whole state easily
        return await Card.findAll();

    } catch (error) {
        console.error(`[syncMoreCharsController] Error:`, error.message);
        throw new Error(`Failed to sync more characters: ${error.message}`);
    }
}

module.exports = { syncMoreCharsController };
