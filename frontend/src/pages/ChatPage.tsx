import { useEffect, useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import LogoutButton from './components/LogOut';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ChatPage = () => {
  const [messages, setMessages] = useState<{ text: string; user: string }[]>([]);

  useEffect(() => {
   
    socket.on('message', (data) => {
      const exists = messages.some((msg) => msg.text === data.text && msg.user === data.user);
      if (!exists) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/chat', {
          credentials: 'include',
        });
    
        if (!response.ok) {
          // Manejar el caso en que la respuesta no es exitosa (por ejemplo, 401 No Autorizado)
          console.error('Error al obtener mensajes:', response.statusText);
          return;
        }
    
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      }
    };
    fetchMessages();

    return () => {
      socket.off('message');
    };
  }, [messages]);

  const handleSendMessage = (newMessage: string) => {
    socket.emit('message', { text: newMessage, createdAt: new Date() });
    setMessages((prevMessages) => [...prevMessages, { text: newMessage, user: 'Yo' }]);
  };


  return (
<Flex className="chat" direction="column" justify="center" align="center" h="100vh">
      <Box
        w={{ base: '100%', sm: '80%', md: '70%', lg: '50%' }}
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





