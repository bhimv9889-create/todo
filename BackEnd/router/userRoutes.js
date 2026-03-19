import express from "express";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authUser from "../middleware/authUser.js";

const router = express.Router();

dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res
        .status(400)
        .json({ message: `Username Or email already exist` });

    const hasedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, name, email, password: hasedPassword });
    const savedUser = await user.save();

    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/google-login", async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36);
      const hashedPassword = await bcrypt.hash(randomPassword, 12);

      user = new User({
        name,
        email,
        username: email.split("@")[0],
        password: hashedPassword,
        profilePic: picture,
      });

      await user.save();
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" },
    );

    res.json({
      token,
      name: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: `User not found` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: `Invalid Password` });

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" },
    );
    res.json({
      token,
      user: {
        username: user.username,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", authUser, async (req, res) => {
  res.json({ message: `Logged out Successfully` });
});

export default router;
