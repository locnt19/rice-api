const router = require("express").Router();

const { userController } = require("../controllers");

const userRoutes = require("./user");
const productCategoryRoutes = require("./product-category");
const articleCategoryRoutes = require("./article-category");

router.use("/user", userRoutes);
router.use("/product-category", productCategoryRoutes);
router.use("/article-category", articleCategoryRoutes);

router.post("/register", userController.createUser);

module.exports = router;
