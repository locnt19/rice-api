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

router.post("/register", userController.createUser);

module.exports = router;
