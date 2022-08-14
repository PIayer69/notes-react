import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';

import axiosInstance from '../Axios';
import '../Navbar';
import Navbar from "../Navbar";
import Backdrop from "./components/Backdrop";
import NewNote from "./components/NewNote";
import NotePreview from "./components/NotePreview";
import Notes from "./components/Notes";


const Home = ({api_url}) => {
    const [notes, setNotes] = useState([])
      const [notePreview, setNotePreview] = useState(false);
      const [noteId, setNoteId] = useState(1);
      const notes_api_url = api_url + 'notes/' ;
      const token_refresh_api_url = api_url + 'token/refresh/';

      const header = {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }

      
      const setTokens = (data) => {
        console.log(`Setting new tokens: ${data['access']} ${data['refresh']}`)
        localStorage.setItem('access_token', data['access'])
        localStorage.setItem('refresh_token', data['refresh'])
      }


      const refreshTokens = (callback = undefined) => {
        let access_token = undefined
        fetch(token_refresh_api_url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'refresh': localStorage.getItem('refresh_token')
          }) 
        }).then(res => res.json())
        .then(data => {
          access_token = data['access']
          console.log(`Got new tokens: ${data['access']} ${data['refresh']}`)
          setTokens(data);
          console.log(`Reading local storage: ${localStorage.getItem('access_token')} ${localStorage.getItem('refresh_token')}`)
        })
        if(callback) callback(access_token);
      }

      const getNotes = (last = false, new_token = undefined) => {
        if(new_token){
          header['Authorization'] = 'Bearer ' + new_token;
          // console.log(new_token)
        }
        fetch(notes_api_url, {
          headers: header
        })
        .then(res => res.json())
        .then((result) => {
          console.log(result['code'])
          if(result['code'] === 'token_not_valid'){
            if(last){
              console.log('Refresh token expired, u need to login')
              return
            }
            console.log(`Reading local storage: ${localStorage.getItem('access_token')} ${localStorage.getItem('refresh_token')}`)
            refreshTokens(getNotes(last = true));
          }
          else{
            setNotes(result);
          }
        })
      }

      //Getting notes from backend
      useEffect(() => {
        getNotes();
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
        fetch(`${notes_api_url}${id}/`, {
          method: 'DELETE',
          headers: header
        });
        setNotes(notes.filter((note) => note.id !== id));
      }
    

      const newNote = (note) => {
        fetch(`${notes_api_url}`, 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': header['Authorization']
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
            'Content-Type': 'application/json',
            'Authorization': header['Authorization']
          } ,
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
          {localStorage.getItem('access_token') ? null : <Navigate to='/login/' />}
          <Navbar/>
          <div className="container">
            <NewNote onAdd={newNote} />
            {
              notes ?
              <Notes notes={notes} onDelete={deleteNote} onEdit={editNote} onPreview={toggleNotePreview}/>
              :
              'There are no notes available'
            }
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