import { useState, useEffect } from "react";

import Backdrop from "./components/Backdrop";
import NewNote from "./components/NewNote";
import NotePreview from "./components/NotePreview";
import Notes from "./components/Notes";


const Home = () => {
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
      const api_url = 'http://192.168.8.119:8000/api/notes/'
    
      useEffect(() => {
        fetch(api_url)
        .then(res => res.json())
        .then((result) => setNotes(result))
    
      }, []);
      
      const toggleNotePreview = (id) => {
        setNotePreview(!notePreview)
        setNoteId(id)
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
      });
      }
    
      const deleteNote = (id) => {
        fetch(`${api_url}${id}/`, {method: 'DELETE'});
        setNotes(notes.filter((note) => note.id !== id));
      }
    
      const newNote = (note) => {
        fetch(`${api_url}`, 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
           body: JSON.stringify({
            body: note.body
           })
        })
        .then(res => res.json())
        .then((data) => {
          note = {
            'id': data.id,
            'body': data.body,
            'created': data.created
          }
          setNotes([...notes, note]);
        });
      }
    
      const editNote = (id, body) => {
        fetch(`${api_url}${id}/`, 
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
           body: JSON.stringify({
            body: body
           })
        })
        .then(res => res.json())
        .then((data) => {
          const updated_note = {
            'id': data.id,
            'body': data.body,
            'created': data.created
          }
          setNotes(() => {
            return(notes.map((note) => {
              if(note.id === id){
                note.body = updated_note.body
              }
              return note
            }));
    
          });
        });
      }
    
      return (
        <>
            <Notes notes={notes} onDelete={deleteNote} onEdit={editNote} onPreview={toggleNotePreview}/>
            <NewNote onAdd={newNote} />
            {
                notePreview && 
                <>
                <Backdrop />
                <NotePreview note={notes.filter((note) => note.id === noteId)[0]} onClose={() => setNotePreview(false)}/>
                </>
            }
        </>
      );
}

export default Home