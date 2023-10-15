import { use } from 'passport';
import react from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';

const ChatPage = () => {

    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/messages/api/chat');
            console.log(response.data.messages);
        }   catch (error) {         
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
         {}
        </div>
    );
    };  

export default ChatPage;