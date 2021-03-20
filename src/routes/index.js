const router = require("express").Router();

const {
  authorization,
  isAdmin,
  isEditorOrAdmin,
  permissionIsOptional
} = require("../middleware/auth");

const { userController } = require("../controllers");

const productCategoryRoutes = require("./product-category");
const articleCategoryRoutes = require("./article-category");
const productRoutes = require("./product");
const fileRoutes = require("./file");
const meRoutes = require("./me");

router.use("/product-category", productCategoryRoutes);
router.use("/article-category", articleCategoryRoutes);
router.use("/product", productRoutes);
router.use("/file", fileRoutes);
router.use("/me", meRoutes);

router.get(
  "/user",
  authorization,
  isEditorOrAdmin,
  userController.findWithQuery
);

router.post("/login", userController.login);
router.post("/register", permissionIsOptional, userController.createUser);
router.post(
  "/delete/user/:id",
  authorization,
  isAdmin,
  userController.deleteUser
);

module.exports = router;
