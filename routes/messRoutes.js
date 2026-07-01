const express = require("express");
const router = express.Router();
const Mess = require("../models/Mess");
const { Op } = require("sequelize");

// =====================
router.get("/", async (req, res) => {
  try {
    const messes = await Mess.findAll();
    res.json(messes);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});
// ======================
// GET BY ID
// ======================
router.get("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);

    if (!mess) {
      return res.status(404).json({ message: "Mess not found" });
    }

    res.json(mess);
  } catch (err) {
    res.status(400).json({
      message: "Invalid ID",
      error: err.message,
    });
  }
});

// ======================
// CREATE
// ======================
router.post("/", async (req, res) => {
  try {
    const { name, location, price } = req.body;

    const newMess = await Mess.create({
      name,
      location,
      price,
    });

    res.status(201).json(newMess);
  } catch (err) {
    res.status(400).json({
      message: "Invalid input",
      error: err.message,
    });
  }
});

// ======================
// UPDATE
// ======================
router.put("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);

    if (!mess) {
      return res.status(404).json({ message: "Mess not found" });
    }

    const { name, location, price } = req.body;

    await mess.update({ name, location, price });

    res.json({
      message: "Updated successfully",
      mess,
    });
  } catch (err) {
    res.status(400).json({
      message: "Update failed",
      error: err.message,
    });
  }
});

// ======================
// DELETE
// ======================
router.delete("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);

    if (!mess) {
      return res.status(404).json({ message: "Mess not found" });
    }

    await mess.destroy();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({
      message: "Delete failed",
      error: err.message,
    });
  }
});

module.exports = router;
