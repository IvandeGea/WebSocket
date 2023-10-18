import React, { useState } from 'react';
import { Box, Input, Button, Flex } from '@chakra-ui/react';

interface ChatInputProps {
  onSendMessage: (message: string, userId: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    console.log('Click en enviar');
    console.log('Message:', message);

    // Obtén el valor de la cookie 'userId'
    const userIdCookie = document.cookie
      .split(';')
      .find(cookie => cookie.trim().startsWith('userId='));

    if (!userIdCookie) {
      console.error('UserID no encontrado en la cookie');
      return;
    }

    const userId = userIdCookie.split('=')[1].trim();
   

    if (message.trim() !== '' && userId) {
      try {

        const response = await fetch(`http://localhost:3001/${userId}/addMessage`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: message,
          }),
        });

        if (response.ok) {
   
          const responseData = await response.json();
          console.log('Mensaje enviado:', responseData);
          onSendMessage(message, userId);
          setMessage('');
        } else {
          console.error('Error al enviar el mensaje:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };

  return (
    <Box className="chat-input" p={4}>
      <Flex>
        <Input
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button ml={2} colorScheme="blue" onClick={handleSendMessage}>
          Enviar
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatInput;

