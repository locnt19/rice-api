const router = require("express").Router();

const {
  authorization,
  isEditor,
  isAdmin,
  isEditorOrAdmin,
  permissionIsOptional
} = require("../middleware/auth");

const { userController } = require("../controllers");

const productCategoryRoutes = require("./product-category");
const articleCategoryRoutes = require("./article-category");
const productRoutes = require("./product");
const articleRoutes = require("./article");
const infoRoutes = require("./info");

router.use("/product-category", productCategoryRoutes);
router.use("/article-category", articleCategoryRoutes);
router.use("/product", productRoutes);
router.use("/article", articleRoutes);
router.use("/info", infoRoutes);

router.get(
  "/user",
  authorization,
  isEditorOrAdmin,
  userController.findWithQuery
);
router.get("/me", authorization, userController.getMe);

router.post("/login", userController.login);
router.post("/register", permissionIsOptional, userController.createUser);
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
