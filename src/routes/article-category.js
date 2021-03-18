const router = require("express").Router();

const { articleCategoryController } = require("../controllers");

router.get("", articleCategoryController.findAll);

router.post("", articleCategoryController.createArticleCategory);
router.post("/delete", articleCategoryController.deleteArticleCategory);
router.post("/:id", articleCategoryController.updateArticleCategory);

module.exports = router;
