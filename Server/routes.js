const express = require('express');
const router = express.Router();
const { addMessage } = require('../controllers/messageController');

// Ruta para agregar un mensaje a un usuario
router.post('/addMessage', addMessage);

module.exports = router;
