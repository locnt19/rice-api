const router = require("express").Router();

const {
  authorization,
  isEditor,
  isAdmin,
  isEditorOrAdmin,
  permissionIsOptional
} = require("../middleware/auth");

const { productCategoryController } = require("../controllers");

router.get("", authorization, productCategoryController.findAll);

router.post("", authorization, productCategoryController.createProductCategory);
router.post(
  "/delete",
  authorization,
  isAdmin,
  productCategoryController.deleteProductCategory
);
router.post(
  "/:id",
  authorization,
  productCategoryController.updateProductCategory
);

module.exports = router;
