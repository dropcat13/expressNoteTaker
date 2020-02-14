const router = require("express").Router();
const database = require("../data/notedata");

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  
  app.get("/api/notes", function(req, res) {
    res.json(notedata);
  });
  
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  
  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
  });

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    savedNotes.length = 0;

    res.json({ ok: true });
  });
};
