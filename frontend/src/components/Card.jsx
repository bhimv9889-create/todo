import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api/notes";

export default function NoteCard({ note, refresh }) {
  // const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);

  const deleteNote = async () => {
    await axios.delete(`${API}/${note._id}`);
    refresh();
  };

  const togglePin = async () => {
    await axios.put(`${API}/${note._id}`, { pinned: !note.pinned });
    refresh();
  };

  const saveNote = async () => {
    await axios.put(`${API}/${note._id}`, { title, content, color });
    setEditing(false);
    refresh();
  };

  return (
    <div className="noteCard" style={{ background: color }}>
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="actions">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <button onClick={saveNote}>Save</button>
          </div>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div className="actions">
            <button onClick={togglePin}>{note.pinned ? "Unpin" : "Pin"}</button>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={deleteNote}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
