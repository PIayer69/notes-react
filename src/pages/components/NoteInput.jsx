import { useState, useEffect } from "react"

const NoteInput = ({cancelNote, submitNote, submitText, inputBody}) => {
    const [noteBody, setNoteBody] = useState('');
    useEffect(() => {
        setNoteBody(inputBody)
    }, [inputBody])
    
  return (
    <>
        <textarea className="new-note-input padding" value={noteBody} onChange={(e) => setNoteBody(e.target.value)}></textarea>
        <div className="new-note-btns">
        <div className="new-note-add-btn pointer transition cancel-btn" onClick={() => cancelNote(setNoteBody)}>Cancel</div>
        <div className="new-note-add-btn pointer transition submit-btn" onClick={() => submitNote(noteBody, setNoteBody)}>{submitText}</div>
        </div>
    </>
  )
}

export default NoteInput