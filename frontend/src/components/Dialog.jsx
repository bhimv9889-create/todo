import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/api/notes";

export default function NoteForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("");

  const addNote = async (e) => {
    e.preventDefault();
    // if (!title.trim() || !content.trim())
    //   return alert("Title or Content required!");

    await axios.post(API, { title, content, color });
    setTitle("");
    setContent("");
    setColor("");
    onAdded();
  };

  return (
    <div className="noteForm" style={{ background: color }}>
      <form onSubmit={addNote}>
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write Your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="formActions">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button type="submit">+</button>
        </div>
      </form>
    </div>
  );
}
