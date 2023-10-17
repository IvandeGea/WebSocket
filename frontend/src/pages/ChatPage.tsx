import React, { useEffect, useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import './components/Chat.css';
const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulación de carga de mensajes desde la API
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/chat');
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = (newMessage: string) => {
    // Puedes enviar el nuevo mensaje al servidor aquí y actualizar la lista de mensajes
    // por ahora, solo lo imprimiremos en la consola
    console.log('Nuevo mensaje:', newMessage);
  };

  return (
    <Flex className="chat" justify="center" align="center" h="100vh">
    <Box
      w={{ base: '100%', md: '80%', lg: '50%' }}
      p={{ base: 3, md: 6 }}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="lg"
    >
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Chat de la Comunidad
      </Text>
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
  </Flex>
  );
};

export default ChatPage;



