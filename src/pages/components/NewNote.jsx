import { useState } from "react"

import NoteInput from "./NoteInput";


const NewNote = ({onAdd}) => {
  const [idle, setIdle] = useState(true);

  const noteAdd = (noteBody, setNoteBody) => {
    onAdd({
      body: noteBody
    });
    setIdle(!idle);
    setNoteBody('');
  }

  const cancelNote = (setNoteBody) =>{
    setIdle(!idle);
    setNoteBody('');
  }

  return (
    <div className="rectangle transition">
      {idle ? 
      <div className="new-note-btn pointer padding transition" onClick={() => setIdle(!idle)}>
        +
        <div>New Note</div>
      </div> : 
      <NoteInput cancelNote={cancelNote} submitNote={noteAdd} submitText={'Add'}/>
      }
    </div>
  )
}

export default NewNote