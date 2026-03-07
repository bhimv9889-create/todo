import React, { useState } from "react";
import {
  CardActions,
  CardContent,
  Box,
  Card,
  Typography,
  Button,
} from "@mui/material";
import { ClassNames } from "@emotion/react";

export default function NoteCard({ note, refresh }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);

  const saveNote = async () => {
    await fetch(`http://localhost:8000/api/notes/${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, color }),
    });

    setEditing(false);
    refresh();
  };

  const togglePin = async () => {
    await fetch(`http://localhost:8000/api/notes/${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pinned: !note.pinned }),
    });

    refresh();
  };

  const deleteNote = async () => {
    await fetch(`http://localhost:8000/api/notes/${note._id}`, {
      method: "DELETE",
    });

    refresh();
  };

  return (
    <Box sx={{ minWidth: 200, maxWidth: 300 }} >
      <Card variant="outlined" sx={{ backgroundColor: note.color }}>
        {editing ? (
          <CardContent>
            <Typography variant="h6">
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Typography>

            <Typography variant="body2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Typography>

            <Typography mt={2}>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <Button onClick={saveNote} variant="contained" sx={{ ml: 2 }}>
                Save
              </Button>
            </Typography>
          </CardContent>
        ) : (
          <>
            <CardContent>
              <Typography variant="h6">{note.title}</Typography>
              <Typography variant="body2">{note.content}</Typography>
            </CardContent>

            <CardActions>
              <Button onClick={togglePin}>
                {note.pinned ? "Unpin" : "Pin"}
              </Button>
              <Button onClick={() => setEditing(true)}>Edit</Button>
              <Button onClick={deleteNote} color="error">
                Delete
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    </Box>
  );
}
