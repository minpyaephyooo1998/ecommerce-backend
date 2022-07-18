const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/infor", auth, userController.getUser);
router.get("/refresh_token", userController.refreshToken);

module.exports = router;
