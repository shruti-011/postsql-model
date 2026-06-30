const express = require("express");
const router = express.Router();
const Mess = require("../models/Mess");

// GET all messes
router.get("/", async (req, res) => {
  try {
    const messes = await Mess.findAll();
    res.json(messes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new mess
router.post("/", async (req, res) => {
  try {
    const { name, location, price } = req.body;
    const newMess = await Mess.create({ name, location, price });
    res.status(201).json(newMess);
  } catch (err) {
    res.status(400).json({ message: "Invalid input", error: err.message });
  }
});

module.exports = router;
