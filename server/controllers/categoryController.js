const { CategoryModel } = require("../models/categoryModel");
const { InventoryModel } = require("../models/inventoryModel");
const { ItemModel } = require("../models/itemModel");

exports.createNewCategory = async (req, res, next) => {
  try {
    const category = await CategoryModel.create({ ...req.body });

    const inventory = await InventoryModel.find();

    inventory[0].categories.push(category);

    await inventory[0].save();

    res.status(201).json({
      status: "success",
      message: "New Category successfully created",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();

    res.status(200).json({
      status: "success",
      message: "Categories successfully fetched",
      data: categories,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getSpecificCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No id provided.");

    const category = await CategoryModel.findById(id);

    if (!category) throw new Error("No category find with the provided id");

    res.status(200).json({
      status: "success",
      message: "Category successfully fetched",
      data: category,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No id provided.");

    delete req.body._id;

    const inventoryDoc = await InventoryModel.find();

    const category = await CategoryModel.findById(id);
    if (!category) throw new Error("No category find with the provided id");

    const categoryIndex = inventoryDoc[0].categories.findIndex(
      (el) => el.title === category.title
    );

    if (categoryIndex < 0) throw new Error("Failed to find inventory doc");

    await CategoryModel.findByIdAndUpdate(id, {
      ...req.body,
    });

    inventoryDoc[0].categories[categoryIndex] = {
      ...req.body,
    };

    console.log(inventoryDoc[0].categories[categoryIndex]);
    await inventoryDoc[0].save();

    res.status(200).json({
      status: "success",
      message: "Category successfully updated",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No id provided.");

    const category = await CategoryModel.findById(id);

    if (!category) throw new Error("No category find with the provided id");

    const inventory = await InventoryModel.find();

    inventory[0].categories = inventory[0].categories.filter(
      (el) => el._id === category._id
    );

    await inventory[0].save();

    const items_id = [];

    if (category.items.length) {
      category.items.forEach((item) => items_id.push(item._id));
    }

    if (items_id.length) {
      for (let i = 0; i < items_id.length; i++) {
        await ItemModel.findByIdAndDelete(items_id[i]);
      }
    }

    await CategoryModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Category successfully deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
