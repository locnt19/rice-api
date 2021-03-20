const router = require("express").Router();

const { authorization, isAdmin } = require("../middleware/auth");

const { articleCategoryController } = require("../controllers");

router.get("", authorization, articleCategoryController.findAll);

router.post("", authorization, articleCategoryController.createArticleCategory);
router.post(
  "/delete",
  authorization,
  isAdmin,
  articleCategoryController.deleteArticleCategory
);
router.post(
  "/:id",
  authorization,
  articleCategoryController.updateArticleCategory
);

module.exports = router;
