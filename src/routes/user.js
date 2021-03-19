const router = require("express").Router();
const { userController } = require("../controllers");

router.get("", userController.findWithQuery);
router.get("/change-password", userController.changePassword);

module.exports = router;
