import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface ChatMessageProps {
  message: any;
}

// const getUsernameColor = (userName) => {
//   // Convierte el nombre de usuario a un número hash
//   let hash = 0;
//   for (let i = 0; i < username.length; i++) {
//     hash = username.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   // Calcula el color usando el hash
//   const color = Math.abs((hash & 0x00FFFFFF) % 0xFFFFFF).toString(16);
  
//   // Añade ceros iniciales si es necesario
//   const paddedColor = `#${'00000'.slice(0, 6 - color.length)}${color}`;

//   return paddedColor;
// };
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {

  return (
    <Box
    maxW="70%"
    alignSelf={message.fromCurrentUser ? 'flex-end' : 'flex-start'}
    mb="2"
    p="4"
    borderRadius="10px"
    bg={message.fromCurrentUser ? 'blue.400' : 'gray.200'}
    color={message.fromCurrentUser ? 'white' : 'black'}
    boxShadow="md"
    position="relative"
    backgroundColor="#D4F5E3"
  >
    <Text fontSize="md" fontWeight="bold">
      {message.userName}
    </Text>
    <Text fontSize="lg">{message.text}</Text>
    <Text fontSize="sm" color="gray.500" position="absolute" bottom="1" right="1">
  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</Text>
    <Box
      position="absolute"
      width="0"
      height="0"
      borderLeft="10px solid transparent"
      borderRight="10px solid transparent"
      borderBottom="10px solid"
      borderColor={message.fromCurrentUser ? 'blue.400' : 'gray.200'}
      bottom="-9px"
      right={message.fromCurrentUser ? '-9px' : 'auto'}
      left={message.fromCurrentUser ? 'auto' : '-9px'}
    />
  </Box>
  );
};

export default ChatMessage;



