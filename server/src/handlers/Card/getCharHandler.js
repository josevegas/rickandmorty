const { getCharController } = require('../../controllers/Cards/getCharController.js');

const getCharHandler = async (req, res) => {
    try {
        const characters = await getCharController();
        res.status(200).send(characters);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = { getCharHandler }