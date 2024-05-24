const { CategoryModel } = require("../models/categoryModel");
const { uploadImage, cloudinary } = require("../utils/uploadImage");
const fs = require("fs");

exports.createNewCategory = async (req, res, next) => {
  try {
    const uploadedImageName = req.uploadedImage;

    let image = null;
    let imageName = null;
    let createdCategory = null;

    if (uploadedImageName) {
      const { image_url, image_name } = await uploadImage(uploadedImageName);
      image = image_url;
      imageName = image_name;
    }

    if (image && imageName) {
      createdCategory = await CategoryModel.create({
        ...req.body,
        image_url: image,
        image_name: imageName,
      });
    } else {
      createdCategory = await CategoryModel.create({
        ...req.body,
      });
    }

    res.status(201).json({
      status: "success",
      message: "New Category successfully created",
      data: createdCategory,
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

    const foundCategory = await CategoryModel.findById(id);

    const uploadedImageName = req.uploadedImage;

    let image = null;
    let imageName = null;
    let originalImageName = null;

    if (uploadedImageName) {
      const { image_url, image_name, image_original_name } = await uploadImage(
        uploadedImageName
      );
      image = image_url;
      imageName = image_name;
      originalImageName = image_original_name;
    }

    if (image && imageName && originalImageName) {
      if (
        foundCategory.image_url !==
        "https://placehold.co/400?text=Image&font=roboto"
      ) {
        await cloudinary.api.delete_resources([`${foundCategory.image_name}`], {
          type: "upload",
          resource_type: "image",
        });
        const directoryPath = `public/images/${originalImageName}`;

        fs.unlink(directoryPath, (err) => {
          if (err) {
            console.error(`Error deleting file at ${directoryPath}:`, err);
          }
        });
      }
      await CategoryModel.findByIdAndUpdate(id, {
        ...req.body,
        image_url: image,
        image_name: imageName,
      });
    } else {
      await CategoryModel.findByIdAndUpdate(id, {
        ...req.body,
      });
    }

    const category = await CategoryModel.findById(id);
    if (!category) throw new Error("No category find with the provided id");

    await CategoryModel.findByIdAndUpdate(id, {
      ...req.body,
    });

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

exports.createNewItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("No category-id provided");

    const category = await CategoryModel.findById(id);

    if (!category)
      throw new Error("No category doc found with the provided id");

    category.items.push({ ...req.body, categoryRef: category._id });

    await category.save();

    res.status(201).json({
      status: "success",
      message: "New item successfully created",
      data: category.items,
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
    const { id, product_code } = req.params;
    if (!id) throw new Error("No category-id provided");
    if (!product_code) throw new Error("No item product code provided");

    const category = await CategoryModel.findById(id);

    if (!category)
      throw new Error("No category doc found with the provided id");

    const itemIndex = category.items.findIndex(
      (el) => el.product_code === product_code
    );

    if (itemIndex < 0)
      throw new Error("No item found with the provided product code");

    category.items[itemIndex] = {
      ...category.items[itemIndex].toObject(),
      ...req.body,
    };

    await category.save();

    res.status(201).json({
      status: "success",
      message: "Item successfully updated",
      data: category.items,
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
    const category = await CategoryModel.find();

    if (!category)
      throw new Error("There are no category yet created in the database");

    const RESULT_ITEMS_ARRAY = [];

    category.forEach((doc) => {
      doc.items.forEach((item) => RESULT_ITEMS_ARRAY.push(item));
    });

    res.status(201).json({
      status: "success",
      message: "Items successfully fetched",
      data: RESULT_ITEMS_ARRAY,
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
    const { id, product_code } = req.params;
    if (!id) throw new Error("No category-id provided");
    if (!product_code) throw new Error("No product code provided");

    const category = await CategoryModel.findById(id);

    if (!category) throw new Error("No category found with the provided id");

    const item = category.items.find((el) => el.product_code === product_code);

    if (!item) throw new Error("No item found with the provided product code");

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

exports.deleteItem = async (req, res, next) => {
  try {
    const { id, product_code } = req.params;
    if (!id) throw new Error("No category-id provided");
    if (!product_code) throw new Error("No product code provided");

    const category = await CategoryModel.findById(id);

    if (!category) throw new Error("No category found with the provided id");

    category.items = category.items.filter(
      (item) => item.product_code !== product_code
    );

    await category.save();

    res.status(201).json({
      status: "success",
      message: "Item successfully deleted",
      data: category.items,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};
