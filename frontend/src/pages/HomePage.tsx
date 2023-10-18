
import {
    Box,
    Container,
  
    Tabs,
    Text,
  } from "@chakra-ui/react";
import {GoogleLoginButton} from './components/googleButton.tsx';

const HomePage =() => (
    <Container maxW="xl" centerContent>
      <Box
      justifyContent="center"
        alignItems="center"
        textAlign={"center"}
      p={3}
      bg="white"
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text fontSize="4xl" fontFamily="Work sans">
        Wold Chat
      </Text>
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs isFitted variant="soft-rounded">
           <GoogleLoginButton/>
      </Tabs>
    </Box>
  </Container>
);

export default HomePage;


