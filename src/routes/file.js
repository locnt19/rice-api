const router = require("express").Router();
const { fileController } = require("../controllers");

router.get("", fileController.findAll);
router.post("", fileController.uploadFile);

module.exports = router;
