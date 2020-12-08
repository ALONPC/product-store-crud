const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    brand: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { collection: "product" }
);

module.exports = mongoose.model("product", productSchema);
