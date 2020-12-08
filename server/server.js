const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Product = require("./api/models/product");
const routes = require("./api/routes/product");

const DBHOST = process.env.DBHOST || "localhost";
const PORT = process.env.PORT || 8000;

const app = express();

const products = require("./database/products");

const connectDb = async () => {
  try {
    await mongoose.connect(`mongodb://${DBHOST}:27017/product-store`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.log("An error occurred when trying to connect to database", err);
  }
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

const seedDb = async () => {
  Product.collection.drop();
  for (const product of products) {
    const newProduct = new Product(product);
    await newProduct.save((err, obj) => {
      if (err) {
        return console.error(err);
      }
      console.log(`${obj.name} saved in the collection`);
    });
  }
  console.log("Seed completed!");
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, host ${DBHOST}`);

  connectDb();
  seedDb();
});

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});
