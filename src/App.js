import { useState } from "react";
import Backdrop from "./components/Backdrop";

import Navbar from "./components/Navbar";
import NewNote from "./components/NewNote";
import NotePreview from "./components/NotePreview";
import Notes from "./components/Notes";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      body: 'My first note'
    },
    {
      id: 2,
      body: 'My second note'
    },
    {
      id: 3,
      body: 'My third note'
    },
    {
      id: 4,
      body: 'My very long note because I want to see if i have overflowing problems. Guess I have...'
    },
  ])
  const [notePreview, setNotePreview] = useState(false)
  const [noteId, setNoteId] = useState(1)

  const toggleNotePreview = (id) => {
    setNotePreview(!notePreview)
    setNoteId(id)
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const newNote = (note) => {
    setNotes([...notes, note])
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Notes notes={notes} onDelete={deleteNote} onPreview={toggleNotePreview}/>
        <NewNote onAdd={newNote} />
        {
          notePreview && 
          <>
            <Backdrop />
            <NotePreview note={notes.filter((note) => note.id == noteId)[0]} onClose={() => setNotePreview(false)}/>
          </>
        }
      </div>
    </>
  );
}

export default App;
