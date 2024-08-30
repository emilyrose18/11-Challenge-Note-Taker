const fs = require('fs');
const util = require('util');

const { v4: uuidv4 } = require('uuid');

const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);


class Store {
  readNote() {
    return readFromFile('db/db.json', 'utf8');
  };

  writeNote(note) {
    return writeToFile('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' or 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv4() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }
}


module.exports = new Store();
