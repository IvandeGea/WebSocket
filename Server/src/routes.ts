import express, { Router } from 'express';
import { addMessageById,
getAllMessages } from './controllers/userController';

// Ruta para añadir un mensaje al usuario por ID
export const router: Router = express.Router();
router.put('/users/:id/addMessage', addMessageById);

// Ruta para obtener todos los mensajes
router.get('/api/chat', getAllMessages);

export default router;
