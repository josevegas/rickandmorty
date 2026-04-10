const { syncMoreCharsController } = require('../../controllers/Cards/syncMoreCharsController.js');

const syncMoreCharsHandler = async (req, res) => {
    try {
        const characters = await syncMoreCharsController();
        res.status(200).send(characters);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = { syncMoreCharsHandler };
