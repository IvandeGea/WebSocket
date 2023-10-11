const User = require('../db/userSchema');


async function addMessageById(req, res) {
  try {
    // Obtén el ID del usuario desde la URL
    const userId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: 'ID de usuario no encontrado en la URL' });
    }

    // Busca al usuario en la base de datos por su ID
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ error: 'Usuario no encontrado en la base de datos' });
    }

    // Extrae el texto del mensaje del cuerpo de la solicitud
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Propiedad "text" no encontrada en el cuerpo de la solicitud' });
    }

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

module.exports = { addMessageById };