const express = require("express");
const router = express.Router();

const {
  createNewCategory,
  getAllCategories,
  getSpecificCategory,
  updateCategory,
  deleteCategory,
  createNewItem,
  updateItem,
  getAllItems,
  getSpecificItem,
  deleteItem,
} = require("../controllers/inventoryController");
const { upload, sendImagePathName } = require("../utils/uploadImage");

// ** Category

router.get("/categories", getAllCategories);
router.get("/categories/:id", getSpecificCategory);

router.post(
  "/category/create",
  upload.single("image_url"),
  sendImagePathName,
  createNewCategory
);

router.patch(
  "/category/:id/update",
  upload.single("image_url"),
  sendImagePathName,
  updateCategory
);

router.delete("/category/:id/delete", deleteCategory);

// ** Items
router.get("/items", getAllItems);
router.get("/item/:id/:product_code", getSpecificItem);

router.post(
  "/item/:id/create",
  upload.single("image_url"),
  sendImagePathName,
  createNewItem
);

router.patch(
  "/item/:id/:product_code/update",
  upload.single("image_url"),
  sendImagePathName,
  updateItem
);

router.delete("/item/:id/:product_code/delete", deleteItem);

module.exports = router;
