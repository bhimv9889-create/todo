import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // ✅ fixed spelling
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // 🔥 restrict values
      default: "user",
    },
  },
  {
    timestamps: true, // ✅ replaces manual createdAt
  },
);

const User = mongoose.model("User", userSchema);
export default User;
