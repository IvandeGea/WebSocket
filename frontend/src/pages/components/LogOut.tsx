
import { Button } from '@chakra-ui/react';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Realiza una solicitud al servidor para cerrar la sesión y eliminar la cookie connect.sid
      const response = await fetch('http://localhost:3001/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Elimina las cookies desde el cliente
        document.cookie = 'displayName=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        sessionStorage.clear()
        console.log('Logout exitoso');
        // Redirige al usuario a la página de inicio
        window.location.href = '/';
      } else {
        console.log('Error en el logout');
      }
    } catch (error) {
      console.error('Error en el logout:', error);
    }
  };

  return (
    <Button colorScheme="grey" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
