import Note from "./Note"

const Notes = ({notes, onDelete, onPreview, onEdit}) => {
  return (
    <>
        {notes.map((note) => (<Note key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} onPreview={onPreview}/>))}
    </>
  )
}

export default Notes