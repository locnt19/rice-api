const router = require("express").Router();

const { permissionIsOptional } = require("../middleware/auth");

const { userController } = require("../controllers");

const productCategoryRoutes = require("./product-category");
const articleCategoryRoutes = require("./article-category");
const productRoutes = require("./product");
const articleRoutes = require("./article");
const infoRoutes = require("./info");
const userRoutes = require("./user");
const fileRoutes = require("./file");
const meRoutes = require("./me");

router.use("/product-category", productCategoryRoutes);
router.use("/article-category", articleCategoryRoutes);
router.use("/product", productRoutes);
router.use("/article", articleRoutes);
router.use("/info", infoRoutes);
router.use("/file", fileRoutes);
router.use("/me", meRoutes);
router.use("/user", userRoutes);

router.post("/login", userController.login);
router.post("/register", permissionIsOptional, userController.createUser);

module.exports = router;
