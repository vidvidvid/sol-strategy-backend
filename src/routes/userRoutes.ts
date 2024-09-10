import express from "express";
import User from "../models/User";

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { publicKey, characterType } = req.body;
    if (!publicKey || !characterType) {
      return res
        .status(400)
        .json({ message: "Public key and character type are required" });
    }
    const user = new User({ publicKey, characterType });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
});

// Get user by public key
router.get("/:publicKey", async (req, res) => {
  try {
    const user = await User.findOne({ publicKey: req.params.publicKey });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error fetching user", error });
  }
});

// Update user
router.put("/:publicKey", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { publicKey: req.params.publicKey },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
});

export default router;
