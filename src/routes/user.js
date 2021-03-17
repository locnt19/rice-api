const router = require("express").Router();
const { userController } = require("../controllers");

router.get("", userController.findAll);
router.post("", userController.createUser);

module.exports = router;
