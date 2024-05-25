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

  item_amount: {
    type: Number,
    default: 0,
  },

  total_item_worth: {
    type: Number,
    default: 0,
  },
  image_url: {
    type: String,
    default: "https://placehold.co/400?text=Image&font=roboto",
  },
  image_name: {
    type: String,
  },

  image_original_name: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
  categoryRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "A item must have a category id ref"],
  },
});

module.exports = {
  ItemSchema,
};
