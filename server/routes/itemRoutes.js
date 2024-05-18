const express = require("express");
const router = express.Router();

const {
  createNewItem,
  getAllItems,
  getSpecificItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.get("/", getAllItems);
router.get("/:product_code", getSpecificItem);

router.post("/:id/create", createNewItem);

router.patch("/:product_code/update", updateItem);

router.delete("/:product_code/delete", deleteItem);

module.exports = router;
