import { Request, Response } from 'express';
import User, { UserDocument } from '../db/userSchema';
import { Message } from '../db/userSchema';

interface NewMessage {
  text: string;
  createdAt: Date;
}

export const addMessageById = async (req: Request, res: Response) => {
  try {
    // Obtén el ID del usuario desde la URL
    const userId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: 'ID de usuario no encontrado en la URL' });
    }

    // Busca al usuario en la base de datos por su ID
    const currentUser: UserDocument | null = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ error: 'Usuario no encontrado en la base de datos' });
    }

    // Extrae el texto del mensaje del cuerpo de la solicitud
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Propiedad "text" no encontrada en el cuerpo de la solicitud' });
    }

    // Crea un nuevo mensaje
    const newMessage: NewMessage = {
      text,
      createdAt: new Date(),
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
};

//muestra todos los mensajes

// messageController.ts


export const getAllMessages = async (req: Request, res: Response) => {
  try {

    console.log("Entro al controlador getAllMessages")
    // Obtener todos los usuarios con mensajes
    const usersWithMessages: UserDocument[] = await User.find({ messages: { $exists: true, $ne: [] } });
    console.log('Usuarios con mensajes:', usersWithMessages);

    // Obtener los mensajes de todos los usuarios con el nombre del usuario
    const allMessages: { text: string; createdAt: Date; userName: string }[] = usersWithMessages.reduce(
      (messages: { text: string; createdAt: Date; userName: string }[], user: UserDocument) => {
        const userName = user.displayName || 'Usuario Desconocido'; // Nombre del usuario o un valor predeterminado si no hay nombre

        const userMessages = user.messages.map((message: Message) => ({
          text: message.text,
          createdAt: message.createdAt,
          userName,
        }));

        return messages.concat(userMessages);
      },
      []
    );

    // Ordenar mensajes por fecha de creación (en orden ascendente)
    const sortedMessages = allMessages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
 console.log('Mensajes ordenados:', sortedMessages);
    return res.status(200).json({ messages: sortedMessages });
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
