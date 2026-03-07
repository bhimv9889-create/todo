import React, { useState } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { MuiColorInput } from "mui-color-input";

const App = ({ onAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");

  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const addNote = async (e) => {
    e.preventDefault();

    try {
      const API = await fetch("http://localhost:8000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, color }),
      });

      if (!API.ok) {
        setSnackType("error");
        setSnackMsg("❌ Failed to add note!");
        setOpen(true);
        return;
      }

      setSnackType("success");
      setSnackMsg("✅ Note added successfully!");
      setOpen(true);

      setTitle("");
      setContent("");
      setColor("#ffffff");

      if (onAdded) onAdded();
    } catch (error) {
      setSnackType(error);
      setSnackMsg("❌ Server error! Check backend.");
      setOpen(true);
    }
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4,
          }}
          onSubmit={addNote}>
          <Typography
            variant="h5"
            textAlign="center"
            component="h1"
            color="orange"
            gutterBottom>
            ToDo App
          </Typography>

          <div class="container1">
            <input
              type="text"
              value={title}
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Task"
            />
            <button>Submit</button>
          </div>

          <TextField
            label="Content"
            multiline
            rows={4}
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            fullWidth
          />

          <Box display="flex" alignItems="center" gap={1}>
            <MuiColorInput
              format="hex"
              value={color}
              onChange={setColor}
              label="Select Color"
            />

            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: color,
                border: "1px solid #ccc",
                borderRadius: "100px",
              }}
              title={`Selected color: ${color}`}
            />
          </Box>
        </Box>

        {/* Snackbar */}
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snackType}
            variant="filled"
            sx={{ width: "100%" }}>
            {snackMsg}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default App;
