const product = require("../controllers/product");

module.exports = (app) => {
  app.route("/products").get(product.list).post(product.search);
  app.route("/product").post(product.create);

  app
    .route("/product/:id")
    .get(product.read)
    .put(product.update)
    .delete(product.delete);
};
