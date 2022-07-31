import { useState } from "react"

const NewNote = ({onAdd}) => {
  const [idle, setIdle] = useState(true);
  const [noteBody, setNoteBody] = useState('')

  const noteAdd = () => {
    onAdd({
      id: Math.floor(Math.random() * 10000) + 1,
      body: noteBody
    });
    setIdle(!idle);
    setNoteBody('');
  }

  const cancelNote = () =>{
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
      <>
      <textarea className="new-note-input padding" value={noteBody} onChange={(e) => setNoteBody(e.target.value)}></textarea>
      <div className="new-note-btns">
        <div className="new-note-add-btn pointer transition" onClick={cancelNote}>Cancel</div>
        <div className="new-note-add-btn pointer transition" onClick={noteAdd}>Add</div>
      </div>
      </>
      }
    </div>
  )
}

export default NewNote