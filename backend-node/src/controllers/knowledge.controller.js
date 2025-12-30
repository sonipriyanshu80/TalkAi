const KnowledgeBase = require("../models/KnowledgeBase.model");

// CREATE
exports.createItem = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const item = await KnowledgeBase.create({
      companyId: req.user.companyId,
      title,
      category,
      content,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// READ (LIST)
exports.listItems = async (req, res) => {
  try {
    const items = await KnowledgeBase.find({
      companyId: req.user.companyId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
exports.updateItem = async (req, res) => {
  try {
    const item = await KnowledgeBase.findOneAndUpdate(
      { _id: req.params.id, companyId: req.user.companyId },
      req.body,
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE (soft delete)
exports.deleteItem = async (req, res) => {
  try {
    const item = await KnowledgeBase.findOneAndUpdate(
      { _id: req.params.id, companyId: req.user.companyId },
      { isActive: false },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};