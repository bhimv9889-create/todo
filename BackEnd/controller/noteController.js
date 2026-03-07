import Note from "../model/noteSchema.js";

export const getAllNotes = async (req, res) => {
  try {
    let notes;

    if (req.user.role === "admin") {
      notes = await Note.find().populate("user", "name email");
    } else {
      notes = await Note.find({ user: req.user.userId }).populate(
        "user",
        "name email",
      );
    }

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, color, pinned } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res
        .status(400)
        .json({ message: "Title and Content are required" });
    }

    const note = await Note.create({
      title,
      content,
      color,
      pinned,
      user: req.user.userId, // 👈 VERY IMPORTANT
    });

    const populatedNote = await note.populate("user", "name email");

    res.status(201).json(populatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedNote) {
      return res.json({ message: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Note.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
