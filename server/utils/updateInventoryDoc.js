const { InventoryModel } = require("../models/inventoryModel");

exports.keepInventoryDocUpdated = async (categoryDoc) => {
  const inventoryDoc = await InventoryModel.find();

  delete categoryDoc._id;
  const categoryIndex = inventoryDoc[0].categories.findIndex(
    (el) => el.title === categoryDoc.title
  );

  if (categoryIndex < 0)
    throw new Error("Category was not found in the inventory doc");

  inventoryDoc[0].categories[categoryIndex] = categoryDoc;

  await inventoryDoc[0].save();
};
