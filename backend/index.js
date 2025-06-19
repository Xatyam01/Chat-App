require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const cors = require('cors');

// Setup Express + HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ✅ Mongoose Message model
const Message = mongoose.model('Message', new mongoose.Schema({
  from: String,
  to: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
}));

// ✅ Users map
const users = {}; // socket.id => username

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Chat server is running');
});

// Optional: Get global chat history (if needed)
app.get('/chat/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;

  const messages = await Message.find({
    $or: [
      { from: user1, to: user2 },
      { from: user2, to: user1 }
    ]
  }).sort({ timestamp: 1 });

  res.json(messages);
});

// ✅ Socket.IO WebSocket logic
io.on('connection', (socket) => {
  console.log(`🟢 ${socket.id} connected`);

  // Register username on connection
  socket.on('register', (username) => {
    users[socket.id] = username;
    console.log(`✅ ${username} joined`);
    io.emit('users', getUsers());
  });

  // Handle private message
  socket.on('private_message', async ({ to, message, from }) => {
  const msg = new Message({ from, to, message });
  await msg.save();

  const payload = {
    from,
    message,
    timestamp: msg.timestamp, // ✅ Add timestamp here
  };

  // Send to recipient
  io.to(to).emit('private_message', payload);

  // Echo back to sender
  io.to(socket.id).emit('private_message', payload);
});

  // On disconnect
  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete users[socket.id];
    console.log(`🔴 ${username || 'User'} disconnected`);
    io.emit('users', getUsers());
  });
});

// ✅ Utility: get connected user list
function getUsers() {
  return Object.entries(users).map(([id, name]) => ({ id, name }));
}

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
