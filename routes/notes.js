const notes = require('express').Router();


notes.get('/',(req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post

notes.delete

module.exports = notes; 