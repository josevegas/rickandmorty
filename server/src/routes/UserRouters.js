const {Router}=require('express');
const {postUserHandler}=require('../handlers/User/postUserHandlers.js');
const {getUserHandler}=require('../handlers/User/getUserHandler.js');
const {getUserFavHandler}=require('../handlers/User/getUserFavHandler.js');

const userRouter=Router();

// Registro de usuario (Signup)
userRouter.post('/signup', postUserHandler);

// Inicio de sesión (Login) - Cambiado a POST para enviar credenciales en el cuerpo
userRouter.post('/login', getUserHandler);

// Obtener favoritos por email
userRouter.get('/:email', getUserFavHandler);

module.exports={userRouter};