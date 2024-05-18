const mongoose = require("mongoose");
const { ItemSchema } = require("./itemModel");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A category must have a title."],
    unique: [true, "Category already in the database"],
  },
  items: [ItemSchema],
  // TODO
  category_items_amount: {
    type: Number,
    default: 0,
  },
  // TODO
  total_category_worth: {
    type: Number,
    default: 0,
  },

  image_url: {
    type: String,
    default: "https://placehold.co/400?text=Image&font=roboto",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = {
  CategorySchema,
  CategoryModel,
};
