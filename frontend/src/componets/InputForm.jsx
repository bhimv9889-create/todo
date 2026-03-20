import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ColorPicker from './ColorPicker';
import { useEffect, useState } from 'react';

export default function InputForm({ setNoteSaved, noteForUpdate, setNoteForUpdate }) {
    const [note, setNote] = useState({
        title: noteForUpdate?.title || "",
        content: noteForUpdate?.content || "",
    })
    const [color, setColor] = useState(noteForUpdate?.color || "#fff9e6")
    const colors = ["#fff9e6", "#f7dfd3", "#e2c3c8", "#afafc7", "#C0C0C0",]

    const formHandler = (e) => {
        // setNote({ ...note, [e.target.name]: e.target.value })
        setNote((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        if (noteForUpdate?._id) {
            setNote({
                title: noteForUpdate.title || "",
                content: noteForUpdate.content || "",
            });
            setColor(noteForUpdate.color || "#fff9e6");
        }
    }, [noteForUpdate?._id]);



    const addTask = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (noteForUpdate?._id) {

            await fetch(`https://todo-production-47f2.up.railway.app/api/notes/${noteForUpdate._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...note, color }),
            });
        } else {

            const res = await fetch("https://todo-production-47f2.up.railway.app/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...note, color }),
            });

            if (!res.ok) {

                return;
            }
        }


        setNoteSaved((pre) => !pre);


        setNote({
            title: "",
            content: "",
        });

        setNoteForUpdate();
    };


    return (
        <>
            <div className='input-wrapper'>

                <Box sx={{ width: "100%", maxWidth: '100%' }}>
                    <TextField fullWidth label="Title" name="title" value={note.title} onChange={(e) => formHandler(e)} required />
                </Box>
                <Box sx={{ width: "100%", maxWidth: '100%' }}>
                    <TextField fullWidth label="Content" name="content" value={note.content} onChange={(e) => formHandler(e)} required />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                    <ColorPicker setColor={setColor} colors={colors} selectedColor={color} />

                </Box>
                <Button variant="contained" onClick={addTask}>{noteForUpdate?.title ? "Update" : "Save"}</Button>
            </div>
        </>
    );
}
