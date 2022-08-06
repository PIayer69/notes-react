import { FaEye, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import NoteInput from './NoteInput';


const Note = ({note, onDelete, onPreview, onEdit}) => {
  const [ editing, setEditing ] = useState(false);

  const noteEdit = (noteBody, setNoteBody) => {
    onEdit(note.id, noteBody);
    setEditing(!editing);
    setNoteBody('');
  }

  const cancelNote = (setNoteBody) =>{
    setEditing(!editing);
    setNoteBody('');
  }

  return (
    <div className='rectangle transition'>
        <div className='options transition'>
            <FaEye className='pointer' onClick={() => onPreview(note.id)}/>
            <FaTimes className='pointer' onClick={() => onDelete(note.id)}/>
        </div>
        {
          editing ? 
          <NoteInput cancelNote={cancelNote} submitNote={noteEdit} submitText='Update' inputBody={note.body}/>
          :
          <div className='note padding' onClick={() => setEditing(!editing)}>
            {note.body}
          </div>
        }
    </div>
  )
}

export default Note