 # 📦 Real-Time Chat App 💬
A full-stack 1-on-1 chat app built using React, Node.js, Socket.IO, and MongoDB. This modern web app supports real-time private messaging, live online user tracking, and persistent chat history — all designed for scalability and clean user experience.

## 🚀 Features:-

-💬 Real-time private messaging using Socket.IO
-🧠 Chat history storage in MongoDB
-🟢 Online user list (auto-updates on connect/disconnect)
-⏱ Timestamped messages with proper formatting
-💻 Modern responsive UI with plain CSS
-🔄 Live user switching & dynamic chat reloading
-🐳 Docker support for production deployment
-🔒 .env support for secure config

🛠 Tech Stack
Frontend	Backend	      Real-Time	     Database
⚛ React	   🟩 Node.js	⚡ Socket.IO	  🍃 MongoDB

📁 Project Structure

chat-app/
├── backend/               # Node.js + Express + MongoDB
│   ├── index.js
│   └── Dockerfile
├── frontend/              # React app
│   ├── src/
│   │   └── App.js
│   ├── public/
│   │   └── favicon.ico
│   └── Dockerfile
├── .gitignore
├── README.md



⚙️ Prerequisites
Node.js (v16 or higher)
MongoDB (Local or Atlas)
Docker (optional, for containerized deploy)

📦 Local Setup Instructions
⬇️ Clone the Repository
git clone https://github.com/your-username/chat-app.git
cd chat-app
🔧 Backend Setup
cd backend
npm install
# Create a .env file
echo "MONGO_URI=mongodb://localhost:27017/chatapp" > .env
node index.js
🌐 Frontend Setup
cd ../frontend
npm install
npm start

🔮 Future Ideas
Feature                 	 Description
🔐 JWT/Firebase Auth	    Add login/signup for real users
🧑‍🤝‍🧑 Group Chats	          Chat rooms or group messaging
📷 Media Sharing	        Image/file upload and display
🔔 Notifications	        In-app or push notifications
✍️ Typing Indicator	        See when someone is typing
🌙 Dark Mode	            Toggleable dark/light theme
📊 Admin Panel	            Monitor active users, messages
📲 Mobile Responsive	    Optimized UI for phones
🚀 Deployment	            Auto-deploy via AWS/GCP/Render
