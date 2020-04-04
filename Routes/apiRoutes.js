"use strict";

var fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
let newNote = {};
let db = require("./data/db.json");

module.exports = function(app) {

  app.get("/api/notes", (req, res) => {
    return res.json(db.notes);
  });

  app.get("/api/notes", function(req, res) {
    // readFileAsync(__dirname + "/data/db.json", "utf8")
    // .then(notes => {
      console.log('Notes: ', db.notes);
      
      // try {
      //   parsedNotes.notes = [].concat(JSON.parse(notes));
      // } catch (err) {
      //   console.log('Error');
        
      //   parsedNotes.notes = [];
      // }  
      // console.log("parsedNotes: ",parsedNotes);
      // res.json(parsedNotes);
      res.json(db.notes);
    })

  app.post("/api/notes", (req, res) => {
    db.counter ++;
    newNote = {
       noteTitle: req.body.title,
       noteText: req.body.text,
       id: db.counter
     };
  
    db.notes.push(newNote);

    writeFileAsync(__dirname + "/data/db.json", JSON.stringify(db), "utf8")
    .then (() => res.json(db))
    .catch((err) => {
      if (err) return console.log(err);
    });
  });

  app.delete("/api/notes/:id", (req, res) => {

    let completed = parseInt( req.params.id);

    console.log(db.notes)

    // for (let i=0; i< db.notes.length; i++) {

      // if (completed === db.notes[i].id) {
        let filteredNotes = db.notes.filter(note => note.id !== completed)
        // console.log("got here", db.notes.splice(i, 1))
        // db.notes=db.notes.splice(i, 1);
        console.log(filteredNotes)
        db.notes = filteredNotes;
        writeFileAsync(__dirname + "/data/db.json", JSON.stringify(db), "utf8")
      .then(() => {
        res.json(db)
      })
      .catch((err) => {
        if (err) return console.log(err);
      });
    });
}