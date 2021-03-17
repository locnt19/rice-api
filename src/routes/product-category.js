const router = require("express").Router();
const { productCategoryController } = require("../controllers");

router.get("", productCategoryController.findAll);

router.post("", productCategoryController.createProductCategory);
router.post("/delete", productCategoryController.deleteProductCategory);
router.post("/:id", productCategoryController.updateProductCategory);
module.exports = router;
