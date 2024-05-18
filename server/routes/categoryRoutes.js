const express = require("express");
const router = express.Router();

const {
  createNewCategory,
  getAllCategories,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.get("/:id", getSpecificCategory);

router.post("/create", createNewCategory);

router.patch("/:id/update", updateCategory);

router.delete("/:id/delete", deleteCategory);

module.exports = router;
