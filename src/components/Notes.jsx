import Note from "./Note"

const Notes = ({notes, onDelete, onPreview}) => {
  return (
    <>
        {notes.map((note) => (<Note key={note.id} note={note} onDelete={onDelete} onPreview={onPreview}/>))}
    </>
  )
}

export default Notes