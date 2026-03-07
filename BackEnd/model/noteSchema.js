import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
    user: {
      // 🔥 RELATION ADDED
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    color: {
      type: String,
      default: "lightgrey",
    },
    pinned: {
      type: Boolean,
      default: false, // ✅ Boolean must be true/false not string
    },
  },
  {
    timestamps: true, // ✅ auto adds createdAt & updatedAt
  },
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
