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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Flex
        direction="column"
        alignItems="center"
        p={4}
        borderRadius="lg"
        boxShadow="lg"
      >
        <LogoutButton />
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          w={{ base: "100%", md: "70%", lg: "50%" }}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Chat de la Comunidad
          </Text>

          <ChatWindow messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </Box>
      </Flex>
    </div>
    </div>
  );
  
};

export default ChatPage;





