const router = require("express").Router();
const { userController } = require("../controllers");

router.get("", userController.findAll);

module.exports = router;
