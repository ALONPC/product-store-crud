const mongoose = require("mongoose");
const product = mongoose.model("product");
const ObjectId = require("mongoose").Types.ObjectId;

exports.search = async (req, res) => {
  const searchValue = req.body.searchValue;

  await product.find(
    {
      ...(searchValue.length === 24
        ? { _id: new ObjectId(searchValue) }
        : {
            brand: { $regex: searchValue, $options: "i" },
            name: { $regex: searchValue, $options: "i" },
          }),
      // description: { $regex: req.body.searchValue, $options: "i" },
    },
    (err, products) => {
      return res.json(products);
    }
  );
};

exports.list = async (req, res) => {
  await product.find({}, (err, products) => {
    if (err) return res.send(err);
    return res.json(products);
  });
};

exports.create = async (req, res) => {
  const newProduct = new product(req.body);
  console.log(
    "🚀 ~ file: product.js ~ line 33 ~ exports.create= ~ newProduct",
    newProduct
  );
  await newProduct.save((err, product) => {
    if (err) return res.send(err);
    return res.json(product);
  });
};

exports.read = async (req, res) => {
  await product.findById(req.params.id, (err, product) => {
    if (err) return res.send(err);
    return res.json(product);
  });
};

exports.update = async (req, res) => {
  await product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, product) => {
      if (err) return res.send(err);
      return res.json(product);
    }
  );
};

exports.delete = async (req, res) => {
  await product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.send(err);
    return res.json({
      message: "Producto eliminado",
      _id: req.params.id,
    });
  });
};
