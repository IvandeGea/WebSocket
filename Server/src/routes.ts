import express, { Router } from 'express';
import { addMessageById,
getAllMessages, 
logoutController} from './controllers/userController';
import { isLoggedIn, } from './middleware';

export const router: Router = express.Router();

// Ruta para añadir un mensaje al usuario por ID
router.put('/:id/addMessage',addMessageById);

// Ruta para obtener todos los mensajes
router.get('/api/chat',isLoggedIn, getAllMessages);

router.post('/logout', isLoggedIn,logoutController);

export default router;
