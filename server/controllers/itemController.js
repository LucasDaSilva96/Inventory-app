const { CategoryModel } = require("../models/categoryModel");
const { ItemModel } = require("../models/itemModel");
const { keepInventoryDocUpdated } = require("../utils/updateInventoryDoc");

exports.createNewItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("No category id provided");

    const categoryDoc = await CategoryModel.findById(id);

    if (!categoryDoc) throw new Error("No category found with the provided id");

    const item = await ItemModel.create({
      ...req.body,
      category_ref: categoryDoc._id,
    });

    categoryDoc.items.push(item);

    await categoryDoc.save();
    await keepInventoryDocUpdated(categoryDoc);

    res.status(201).json({
      status: "success",
      message: "New item successfully created",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json({
      status: "success",
      message: "Item successfully fetched",
      data: items,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getSpecificItem = async (req, res, next) => {
  try {
    const { product_code } = req.params;

    if (!product_code) throw new Error("No product code provided");

    const item = await ItemModel.findOne({
      product_code,
    });

    if (!item) throw new Error("No item found with the provided product code.");

    res.status(201).json({
      status: "success",
      message: "Item successfully fetched",
      data: item,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const { product_code } = req.params;

    if (!product_code) throw new Error("No product code provided");

    const item = await ItemModel.findOne({ product_code });
    if (!item) throw new Error("No item found with the provided product code");

    const category = await CategoryModel.findById(item.category_ref);

    const categoryIndex = category.items.findIndex(
      (el) => el.product_code === item.product_code
    );

    if (categoryIndex < 0)
      throw new Error("No category found with the provided product code");

    category.items[categoryIndex] = {
      ...category.items[categoryIndex].toObject(),
      ...req.body,
    };

    await category.save();

    await ItemModel.findOneAndUpdate({ product_code }, { ...req.body });
    await keepInventoryDocUpdated(category);

    res.status(201).json({
      status: "success",
      message: "Item successfully updated",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const { product_code } = req.params;

    if (!product_code) throw new Error("No product code provided");

    const item = await ItemModel.findOneAndDelete({ product_code });

    const categoryDoc = await CategoryModel.findById(item.category_ref);

    if (!categoryDoc)
      throw new Error("No category document found with the provided id");

    categoryDoc.items = categoryDoc.items.filter(
      (item) => item.product_code !== product_code
    );

    await categoryDoc.save();

    await keepInventoryDocUpdated(categoryDoc);

    res.status(201).json({
      status: "success",
      message: "Item successfully deleted",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
