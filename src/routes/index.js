const router = require("express").Router();

const { userController } = require("../controllers");

const userRoutes = require("./user");
const productCategoryRoutes = require("./product-category");
const articleCategoryRoutes = require("./article-category");
const productRoutes = require("./product");

router.use("/user", userRoutes);
router.use("/product-category", productCategoryRoutes);
router.use("/article-category", articleCategoryRoutes);
router.use("/product", productRoutes);

router.get("/me", userController.getMe);

router.post("/login", userController.login);
router.post("/register", userController.createUser);
router.post("/delete/user/:id", userController.deleteUser);

module.exports = router;
