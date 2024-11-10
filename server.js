const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let sharedText = ""; // Store shared document content

app.use(express.static(__dirname));

// Serve index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle WebSocket connection
io.on("connection", (socket) => {
  // Send the current text to the newly connected client
  socket.emit("textUpdate", sharedText);

  // Update text and broadcast to all clients
  socket.on("textUpdate", (text) => {
    sharedText = text;
    socket.broadcast.emit("textUpdate", text);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
