"use strict";

var fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
let newNote = {};
let parsedNotes = {
  counter: 0,
  notes: []
};

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    readFileAsync(__dirname + "/data/db.json", "utf8")
    .then(notes => {
      
      try {
        parsedNotes.notes = [].concat(JSON.parse(notes));
      } catch (err) {
        console.log('Error');
        
        parsedNotes.notes = [];
      }  
      console.log("parsedNotes: ",parsedNotes);
      res.json(parsedNotes);
    })
  });

  app.post("/api/notes", (req, res) => {
    parsedNotes.counter ++;
    newNote = {
       noteTitle:req.body.title,
       noteText: req.body.text,
       id: parsedNotes.counter
     };
  
    parsedNotes.notes.push(newNote);

    writeFileAsync(__dirname + "/data/db.json", JSON.stringify(parsedNotes), "utf8")
    .catch((err) => {
      if (err) return console.log(err);
      res.json(parsedNotes);
    });
  });

  app.delete("/api/notes/:id", (req, res) => {

    let completed = parseInt( req.params.id);

    for (let i=0; i< parsedNotes.notes.length; i++) {

      if (completed === parsedNotes.notes[i].id) {
        parsedNotes.notes.splice(i,1);
        writeFileAsync(__dirname + "/data/db.json", JSON.stringify(parsedNotes), "utf8")
      .then(() => {
        if (err) return console.log(err);
        res.json(parsedNotes);
      });
      }
    }
  });
}