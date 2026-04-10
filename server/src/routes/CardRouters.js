const { Router } = require('express');
const multer = require('multer');
const { getCharByIdHandler } = require('../handlers/Card/getCharByIdHandler.js');
const { getCharHandler } = require('../handlers/Card/getCharHandler.js');
const { syncMoreCharsHandler } = require('../handlers/Card/syncMoreCharsHandler.js');
const { postCharFavHandler } = require('../handlers/Card/postCharFavHandler.js');
const { deleteCharFavHandler } = require('../handlers/Card/deleteCharFavHandler.js');

const cardRouter = Router();
const storage = multer.memoryStorage();

cardRouter.get('/', getCharHandler);
cardRouter.get('/sync-more', syncMoreCharsHandler);
cardRouter.get('/:id', getCharByIdHandler);
cardRouter.post('/:email/:id', postCharFavHandler);
cardRouter.delete('/:email/:id', deleteCharFavHandler);

module.exports = { cardRouter };