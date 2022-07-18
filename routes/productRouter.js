const productCtrl = require("../controllers/productController");

const router = require("express").Router();

router
  .route("/products")
  .get(productCtrl.getProducts)
  .post(productCtrl.createProducts)

router
  .route("/products/:id")
  .delete(productCtrl.deleteProducts)
  .put(productCtrl.updateProducts)

// router.get('/', productCtrl.getProducts)

module.exports = router;
