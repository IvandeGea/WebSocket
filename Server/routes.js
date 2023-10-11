const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

// Ruta para añadir un mensaje al usuario por ID
router.put('/users/:id/addMessage', userController.addMessageById);

module.exports = router;
