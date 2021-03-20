const router = require("express").Router();

const { authorization, isAdmin } = require("../middleware/auth");

const { articleController } = require("../controllers");

router.get("", authorization, articleController.findAll);
router.get("/lasted", authorization, articleController.findLastedArticle);
router.get("/filter", authorization, articleController.findArticleByFilter);
router.get(
  "/by-category/:id",
  authorization,
  articleController.findArticleByCategory
);
router.get("/:id", authorization, articleController.findById);

router.post("", authorization, articleController.createArticle);
router.post("/delete", authorization, isAdmin, articleController.deleteArticle);
router.post("/:id", authorization, articleController.updateArticle);

module.exports = router;
