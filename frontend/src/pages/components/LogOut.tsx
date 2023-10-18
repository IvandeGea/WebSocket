
import { Button } from '@chakra-ui/react';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {

      const response = await fetch('http://localhost:3001/logout', {
        method: 'POST',  
        credentials: 'include', 
      });

      if (response.ok) {
       
        console.log('Logout exitoso');
      } else {
     
        console.error('Error en el logout:', response.statusText);
      }
    } catch (error: any) {

      console.error('Error en el logout:', error.message);
    }
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
