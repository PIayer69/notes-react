import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import axiosInstance from "../Axios";
import "../Navbar";
import Navbar from "../Navbar";
import Backdrop from "./components/Backdrop";
import NewNote from "./components/NewNote";
import NotePreview from "./components/NotePreview";
import Notes from "./components/Notes";

const Home = ({ api_url }) => {
  const [notes, setNotes] = useState([]);
  const [notePreview, setNotePreview] = useState(false);
  const [noteId, setNoteId] = useState(1);

  const getNotes = () => {
    axiosInstance.get("notes/").then((res) => {
      if (typeof res.data.notes !== "undefined") setNotes(res.data.notes);
    });
  };

  // Getting notes from backend
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleNotePreview = (id) => {
    setNotePreview(!notePreview);
    setNoteId(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteNote = (id) => {
    axiosInstance.delete("notes/" + id + "/");
    setNotes(notes.filter((note) => note.id !== id));
  };

  const newNote = (note) => {
    axiosInstance
      .post("notes/", {
        body: note.body,
      })
      .then((res) => {
        note = {
          id: res.data.id,
          body: res.data.body,
          created: res.data.created,
        };
        setNotes((prev) => [note, ...prev]);
      });
  };

  const editNote = (id, body) => {
    axiosInstance
      .put("notes/" + id + "/", {
        body: body,
      })
      .then((res) => {
        const updated_note = {
          id: res.data.id,
          body: res.data.body,
          created: res.data.created,
        };
        setNotes(() => {
          return notes.map((note) => {
            if (note.id === id) {
              note.body = updated_note.body;
            }
            return note;
          });
        });
      });
  };

  return (
    <>
      {localStorage.getItem("access_token") ? null : <Navigate to="/login/" />}
      <Navbar />
      <div className="container">
        <NewNote onAdd={newNote} />
        {notes.length ? (
          <Notes
            notes={notes}
            onDelete={deleteNote}
            onEdit={editNote}
            onPreview={toggleNotePreview}
          />
        ) : (
          <div className="placeholder rectangle padding center">
            It is empty... <br></br>Too empty
          </div>
        )}
        {notePreview && (
          <>
            <Backdrop />
            <NotePreview
              note={notes.filter((note) => note.id === noteId)[0]}
              onClose={() => setNotePreview(false)}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
