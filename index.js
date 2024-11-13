require("dotenv").config();
const express = require("express");
const http = require("http");
// const socketio = require("socket.io");
const { Server } = require("socket.io");
// const cors = require("cors");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle location updates
  socket.on("locationUpdate", (locationData) => {
    console.log("Location Update:", locationData);
    io.emit("broadcastLocation", locationData); // Broadcast location to all connected users
  });

  // Disconnect user when the browser window is closed
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
