import React from 'react';
import { Button, Flex} from "@chakra-ui/react";
import { FaGoogle } from 'react-icons/fa';

 export const GoogleLoginButton: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google'; 
  };

  return (
    <Flex justifyContent="center">
      <Button
        leftIcon={<FaGoogle  style={{ color: '#4285F4' }} />}
        colorScheme="blue" 
        variant="solid"
        onClick={handleGoogleLogin}
      >
        Acceder con cuenta de Google
      </Button>
    </Flex>
  );
};

