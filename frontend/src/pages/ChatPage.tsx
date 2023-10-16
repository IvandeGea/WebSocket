import React, { useEffect, useState } from 'react';



const ChatPage =  () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/chat")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));
  },[])
  console.log(messages);
  
  return (
    <div>
       <table>
        <thead>
          <tr>
            <th>Message</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message: any) => (
            <tr key={message.createdAt}>
              <td>{message.text}</td>
              <td>{message.userName} {message.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  
  );
};

export default ChatPage;



// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch('http://localhost:5173/messages/api/chat');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setMessages(data.messages);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   return (
//     <div>
//       Aquí los mensajes
//       {messages.map((message) => (
//         <div key={message.createdAt}>
//           {message.text} - {message.userName}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatPage;
