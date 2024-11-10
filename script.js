const socket = io();
const editor = document.getElementById("editor");

// Disable Ctrl/Cmd + A to prevent "select all" action
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "a") {
    e.preventDefault();
  }
});

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
