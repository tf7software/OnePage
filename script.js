const socket = io();
const editor = document.getElementById("editor");

// Emit changes to the server when content is modified
editor.addEventListener("input", () => {
  socket.emit("textUpdate", editor.innerText);
});

// Update editor content when changes come from the server
socket.on("textUpdate", (text) => {
  if (editor.innerText !== text) {
    editor.innerText = text;
  }
});
