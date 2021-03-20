const router = require("express").Router();

const { authorization, isAdmin } = require("../middleware/auth");

const { userController } = require("../controllers");

const productCategoryRoutes = require("./product-category");
const articleCategoryRoutes = require("./article-category");
const productRoutes = require("./product");

router.use("/product-category", productCategoryRoutes);
router.use("/article-category", articleCategoryRoutes);
router.use("/product", productRoutes);

router.get("/user", userController.findWithQuery);
router.get("/me", authorization, userController.getMe);

router.post("/login", userController.login);
router.post("/register", userController.createUser);
router.post(
  "/delete/user/:id",
  authorization,
  isAdmin,
  userController.deleteUser
);
router.post(
  "/me/change-password",
  authorization,
  userController.changePassword
);

module.exports = router;
