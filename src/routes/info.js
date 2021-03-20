const router = require("express").Router();

const { authorization } = require("../middleware/auth");

const { infoController } = require("../controllers");

router.get("", authorization, infoController.findAll);
router.post("", authorization, infoController.updateInfo);

module.exports = router;
