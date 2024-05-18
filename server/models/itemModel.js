const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A item must have a title"],
  },
  description: {
    type: String,
    required: [true, "A item must have a description"],
  },
  product_code: {
    type: String,
    default: uuidv4(),
  },

  price: {
    type: Number,
    required: [true, "A item must have a price"],
  },

  //TODO
  item_amount: {
    type: Number,
    default: 0,
  },

  // TODO
  total_item_worth: {
    type: Number,
    default: 0,
  },
  image_url: {
    type: String,
    default: "https://placehold.co/800?text=Image&font=roboto",
  },

  category_ref: {
    type: mongoose.Schema.ObjectId,
    ref: "category",
    required: [true, "A item must belong to a category"],
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const ItemModel = mongoose.model("item", ItemSchema);

module.exports = {
  ItemSchema,
  ItemModel,
};
