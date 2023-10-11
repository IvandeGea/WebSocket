const User = require('../models/userSchema');
const message= require('../models/messageSchema');


async function addMessage(req, res) {
  try {
    // Obtén el usuario actual desde la sesión (suponiendo que estás utilizando Passport)
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({ error: 'Usuario no  encontrado' });
    }

    // Extrae el texto del mensaje del cuerpo de la solicitud
    const { text } = req.body;

    // Crea un nuevo mensaje
    const newMessage = {
      text,
      createdAt: new Date()
    };

    // Añade el mensaje al array de mensajes del usuario
    currentUser.messages.push(newMessage);

    // Guarda el usuario actualizado en la base de datos
    await currentUser.save();

    return res.status(200).json({ message: 'Mensaje añadido correctamente', newMessage });
  } catch (error) {
    console.error('Error al añadir mensaje:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { addMessage };
