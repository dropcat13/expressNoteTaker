// Dependencies
// =============================================================
const express = require("express");
app.use(express.static('public'));
const path = require("path");
​
// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;
​
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
​
// Link to a JSON package file - db.json? 
// =============================================================
​
// Routes
// =============================================================
​
// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
​
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});
​
// Creating the json api
app.get("/api/notes", (req, res) => {
  return res.json(notes);
});
​
// Create New notes - takes in JSON input
app.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = req.body;
​
  // Using a RegEx Pattern to remove spaces from newTable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
​
  console.log(newNote);
​
  notes.push(newNote);
​
  res.json(newNote);
});
​
​
// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});




