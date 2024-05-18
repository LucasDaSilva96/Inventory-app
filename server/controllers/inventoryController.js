const { CategoryModel } = require("../models/categoryModel");
const { InventoryModel } = require("../models/inventoryModel");
const { ItemModel } = require("../models/itemModel");

exports.createNewInventory = async (req, res, next) => {
  try {
    await InventoryModel.create({ ...req.body });

    res.status(201).json({
      status: "success",
      message: "Inventory successfully created",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getInventory = async (req, res, next) => {
  try {
    const inventory = await InventoryModel.find();

    if (!inventory) throw new Error("No inventory document found");

    res.status(200).json({
      status: "success",
      message: "Inventory successfully fetched",
      data: inventory,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateInventory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No inventory id provided");

    await InventoryModel.findByIdAndUpdate(id, { ...req.body });

    res.status(200).json({
      status: "success",
      message: "Inventory successfully updated",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.deleteInventory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No inventory id provided");

    const inventory = await InventoryModel.findByIdAndDelete(id);

    const categories_id = [];
    const items_id = [];

    if (inventory.categories.length) {
      inventory.categories.forEach((el) => categories_id.push(el._id));
    }

    if (categories_id.length) {
      for (let i = 0; i < categories_id.length; i++) {
        const categoryDoc = await CategoryModel.findByIdAndDelete(
          categories_id[i]
        );

        if (categoryDoc.items.length) {
          categoryDoc.items.forEach((el) => items_id.push(el._id));
        }
      }
    }

    if (items_id.length) {
      for (let i = 0; i < items_id.length; i++) {
        await ItemModel.findByIdAndDelete(items_id[i]);
      }
    }

    res.status(200).json({
      status: "success",
      message: "Inventory successfully deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
