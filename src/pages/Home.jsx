import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import axiosInstance from "../Axios";
import "../Navbar";
import Navbar from "../Navbar";
import Backdrop from "./components/Backdrop";
import NewNote from "./components/NewNote";
import NotePreview from "./components/NotePreview";
import Notes from "./components/Notes";

const Home = () => {
  const [notes, setNotes] = useState(null);
  const [notePreview, setNotePreview] = useState({
    bool: false,
    id: 1,
  });

  // Getting notes from backend
  useEffect(() => {
    axiosInstance.get("notes/").then((res) => {
      if (typeof res.data.notes !== "undefined") setNotes(res.data.notes);
      else setNotes([]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleNotePreview = (id) => {
    setNotePreview({
      bool: !notePreview.bool,
      id: id,
    });
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
        setNotes((prev) => prev ? [note, ...prev] : [note]);
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
        {notes && notes.length ? (
          <Notes
            notes={notes}
            onDelete={deleteNote}
            onEdit={editNote}
            onPreview={toggleNotePreview}
          />
        ) : (
          <div className="placeholder rectangle padding center">
            {notes
              ? "It is empty... Too empty"
              : "We are getting your notes..."}
          </div>
        )}
        {notePreview.bool && (
          <>
            <Backdrop />
            <NotePreview
              note={notes.filter((note) => note.id === notePreview.id)[0]}
              onClose={() =>
                setNotePreview({ ...notePreview, bool: !notePreview.bool })
              }
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
