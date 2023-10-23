import React, { useEffect, useRef } from 'react';
import { Flex } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';

const ChatWindow: React.FC<{ messages: any[] }> = ({ messages }) => {
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Función para hacer scroll a la parte inferior del chat
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Llama a la función de scroll cuando se monta el componente
    scrollToBottom();
  }, []); // Solo se llama al montar el componente

  useEffect(() => {
    // Llama a la función de scroll cada vez que se actualizan los mensajes
    scrollToBottom();
  }, [messages]);

  return (
    <Flex
      direction="column"
      p="4"
      bg="gray.100"
      maxH="75vh"
      maxW="-moz-fit-content"
      overflowY="auto"
      ref={chatWindowRef}
    >
      <Flex direction="column" flex="1" overflowY="auto">
        {messages.map((message) => (
          <ChatMessage key={String(message.createdAt)} message={message} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ChatWindow;


