import { useState, useEffect } from "react";

import '../Navbar';
import Navbar from "../Navbar";
import Backdrop from "./components/Backdrop";
import NewNote from "./components/NewNote";
import NotePreview from "./components/NotePreview";
import Notes from "./components/Notes";


const Home = ({api_url}) => {
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
      const notes_api_url = api_url + 'notes/' 
    
      useEffect(() => {
        console.log(notes_api_url)
        fetch(notes_api_url)
        .then(res => res.json())
        .then((result) => setNotes(result))
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        fetch(`${notes_api_url}${id}/`, {method: 'DELETE'});
        setNotes(notes.filter((note) => note.id !== id));
      }
    
      const newNote = (note) => {
        fetch(`${notes_api_url}`, 
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
        fetch(`${notes_api_url}${id}/`, 
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
          <Navbar/>
          <div className="container">
            <NewNote onAdd={newNote} />
            <Notes notes={notes} onDelete={deleteNote} onEdit={editNote} onPreview={toggleNotePreview}/>
            {
              notePreview && 
              <>
                <Backdrop />
                <NotePreview note={notes.filter((note) => note.id === noteId)[0]} onClose={() => setNotePreview(false)}/>
              </>
            }
          </div>
        </>
      );
}

export default Home