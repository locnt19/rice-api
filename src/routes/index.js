const router = require("express").Router();

const userRoutes = require("./user");
const productCategoryRoutes = require("./product-category");
const articleCategoryRoutes = require("./article-category");

router.use("/user", userRoutes);
router.use("/product-category", productCategoryRoutes);
router.use("/article-category", articleCategoryRoutes);


module.exports = router;
