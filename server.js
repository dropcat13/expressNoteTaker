const express = require("express");
// app.use(express.static('public'));

// move to api file. 
const router = require("express").Router();
const path = require("path");
const app = express();
const PORT = 3000;

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create New notes - takes in JSON input
// app.post("/api/notes", (req, res) => {
//   const newNote = req.body;
//   newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
//   console.log(newNote);
//   notes.push(newNote);
//   res.json(newNote);
// });

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});