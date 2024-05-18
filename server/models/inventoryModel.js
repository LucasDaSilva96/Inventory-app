const mongoose = require("mongoose");
const { CategorySchema } = require("./categoryModel");

const InventorySchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Inventory",
  },
  categories: [CategorySchema],

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const InventoryModel = mongoose.model("inventory", InventorySchema);

module.exports = {
  InventoryModel,
};
