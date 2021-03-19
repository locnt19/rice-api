const router = require("express").Router();

const { productController } = require("../controllers");

router.get("", productController.findAll);
router.get("/lasted", productController.findLastedProduct);
router.get("/filter", productController.findProductByFilter)
router.get("/by-category/:id", productController.findProductByCategory);
router.get("/:id", productController.findById);

router.post("", productController.createProduct);
router.post("/delete", productController.deleteProduct);
router.post("/:id", productController.updateProduct);

module.exports = router;