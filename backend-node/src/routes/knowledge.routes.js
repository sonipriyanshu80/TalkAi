const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createItem,
  listItems,
  updateItem,
  deleteItem,
} = require("../controllers/knowledge.controller");

router.post("/", auth, createItem);
router.get("/", auth, listItems);
router.put("/:id", auth, updateItem);
router.delete("/:id", auth, deleteItem);

module.exports = router;