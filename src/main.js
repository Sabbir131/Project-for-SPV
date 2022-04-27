// Referencing  with HTML
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

// To get every note after creating
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

// calling addNote function when it is clicked to add note
addNoteButton.addEventListener("click", () => addNote());

// To get the note 
function getNotes() {
  return JSON.parse(localStorage.getItem("notes-notes") || "[]");
}

// saving notes in local storage 
function saveNotes(notes) {
  localStorage.setItem("notes-notes", JSON.stringify(notes));
}

// creating Html elements witn js
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Write your note";

  // when any changes occur in note by user then event listener calls updateNote
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  // eventlistener to delete a note when it is double clicked with a notice
  element.addEventListener("dblclick", () => {
    const doingDelete = confirm(
      "Do you want to delete it?"
    );

    if (doingDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

// Add note function
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

// Update note function 
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

// To delete a note
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}

