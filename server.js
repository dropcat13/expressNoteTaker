const express = require("express");
// app.use(express.static('public'));
const path = require("path");
const app = express();
const PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Link to a JSON package file - db.json? 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});
app.get("/api/notes", (req, res) => {
  return res.json(notes);
});
// Create New notes - takes in JSON input
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  console.log(newNote);
  notes.push(newNote);
  res.json(newNote);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});