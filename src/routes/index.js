const router = require("express").Router();
const userRoutes = require("./user");
const productCategoryRoutes = require("./product-category");

router.use("/user", userRoutes);
router.use("/product-category", productCategoryRoutes);


module.exports = router;
