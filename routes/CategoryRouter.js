const categoryCtrl = require("../controllers/categoryController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

const router = require("express").Router();

router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(auth, authAdmin, categoryCtrl.createCategory);

router
  .route("/category/:id")
  .delete(auth, authAdmin, categoryCtrl.deleteCategory)
  .put(auth, authAdmin, categoryCtrl.updateCategory);

module.exports = router;
