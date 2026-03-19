import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controller/noteController.js";
import Note from "../model/noteSchema.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.put("/:id/pin", authUser, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    note.pinned = !note.pinned;
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authUser, createNote);
router.get("/", authUser, getAllNotes);
router.put("/:id", authUser, updateNote);
router.delete("/:id", authUser, deleteNote);

export default router;
