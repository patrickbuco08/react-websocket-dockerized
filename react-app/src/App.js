import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:8080');

    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Socket.io React App</h1>
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
