const router = require("express").Router();

const { authorization, isEditorOrAdmin } = require("../middleware/auth");

const { fileController } = require("../controllers");

router.get("", authorization, isEditorOrAdmin, fileController.findAll);
router.post("", authorization, fileController.uploadFile);

module.exports = router;
