const router = require("express").Router();

const { authorization, isAdmin } = require("../middleware/auth");

const { productController } = require("../controllers");

router.get("", authorization, productController.findAll);
router.get("/lasted", authorization, productController.findLastedProduct);
router.get("/filter", authorization, productController.findProductByFilter);
router.get(
  "/by-category/:id",
  authorization,
  productController.findProductByCategory
);
router.get("/:id", authorization, productController.findById);

router.post("", authorization, productController.createProduct);
router.post("/delete", authorization, isAdmin, productController.deleteProduct);
router.post("/:id", authorization, productController.updateProduct);

module.exports = router;
