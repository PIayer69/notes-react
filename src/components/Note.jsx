import { FaEye, FaTimes } from 'react-icons/fa'

const Note = ({note, onDelete, onPreview}) => {
  return (
    <div className='rectangle transition'>
        <div className='options transition'>
            <FaEye className='pointer' onClick={() => onPreview(note.id)}/>
            <FaTimes className='pointer' onClick={() => onDelete(note.id)}/>
        </div>
        <div className='note padding'>
            {note.body}
        </div>
    </div>
  )
}

export default Note