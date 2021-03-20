const router = require("express").Router();

const {
  authorization,
  isEditorOrAdmin,
  isAdmin
} = require("../middleware/auth");

const { userController } = require("../controllers");

router.get("", authorization, isEditorOrAdmin, userController.findWithQuery);

router.post("/delete/:id", authorization, isAdmin, userController.deleteUser);

module.exports = router;
