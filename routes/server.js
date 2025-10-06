import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const serverSchema = new mongoose.Schema({
  guildId: String,
  prefix: { type: String, default: "!" },
});

const Server = mongoose.model("Server", serverSchema);

// Get settings
router.get("/:guildId", async (req, res) => {
  const server = await Server.findOne({ guildId: req.params.guildId });
  if (!server) return res.json({ guildId: req.params.guildId, prefix: "!" });
  res.json(server);
});

// Update settings
router.post("/:guildId", async (req, res) => {
  const { prefix } = req.body;
  const server = await Server.findOneAndUpdate(
    { guildId: req.params.guildId },
    { prefix },
    { new: true, upsert: true }
  );
  res.json(server);
});

export default router;
