import { FaTimes } from "react-icons/fa"

const NotePreview = ({note, onClose}) => {
  return (
    <div className="note-preview padding">
        <FaTimes className="pointer note-preview-cross" onClick={onClose}/>
        {note.body}
    </div>
  )
}

export default NotePreview