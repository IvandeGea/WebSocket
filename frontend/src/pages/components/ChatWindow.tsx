import React from 'react';
import { Flex } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';

const ChatWindow: React.FC<{ messages: any[] }> = ({ messages }) => {
  return (
    <Flex direction="column" p="4" bg="gray.100" maxH="80vh" overflowY="auto">
  
      <Flex direction="column" flex="1" overflowY="auto">
        {messages.map((message) => (
          <ChatMessage key={message.createdAt} message={message} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ChatWindow;



