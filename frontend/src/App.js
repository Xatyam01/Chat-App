import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const user = prompt("Enter your name:");
    setUsername(user || 'Anonymous');
    socket.emit('register', user || 'Anonymous');

    socket.on('users', setUsers);

    socket.on('private_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off('users');
      socket.off('private_message');
    };
  }, []);

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    try {
      const response = await fetch(`http://localhost:5000/chat/${username}/${user.name}`);
      const messages = await response.json();
      setChat(messages);
    } catch (err) {
      console.error('Error fetching chat history:', err);
      setChat([]);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!selectedUser || !message.trim()) return;
    socket.emit('private_message', {
      to: selectedUser.id,
      message,
      from: username,
    });
    setMessage('');
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h3>Online Users</h3>
        <ul>
          {users.map(user => (
            user.name !== username && (
              <li
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={selectedUser?.id === user.id ? 'selected' : ''}
              >
                {user.name}
              </li>
            )
          ))}
        </ul>
      </div>
      <div className="chat-section">
        <h2>Chat with {selectedUser?.name || "..."}</h2>
        <div className="message-box">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.from === username ? 'sent' : 'received'}`}
            >
              <strong>{msg.from}:</strong> {msg.message}
              <br />
              <small style={{ color: '#888' }}>
                {new Date(msg.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="input-form">
          <input
            type="text"
            value={message}
            placeholder="Type..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
