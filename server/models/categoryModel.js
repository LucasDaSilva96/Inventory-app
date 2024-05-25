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
});

CategorySchema.pre("save", function (next) {
  const totalItemsQuantity = this.items.reduce((accumulator, item) => {
    return (accumulator += item.item_amount);
  }, 0);

  let totalCategoryWorth = 0;

  this.items.forEach((element) => {
    totalCategoryWorth += element.price * element.item_amount;
  });

  this.category_items_amount = totalItemsQuantity;
  this.total_category_worth = totalCategoryWorth;

  next();
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = {
  CategorySchema,
  CategoryModel,
};
