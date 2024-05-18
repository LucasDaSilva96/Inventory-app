const express = require("express");
const router = express.Router();

const {
  createNewInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

router.get("/", getInventory);

router.patch("/:id", updateInventory);

router.post("/create", createNewInventory);

router.delete("/:id/delete", deleteInventory);

module.exports = router;
