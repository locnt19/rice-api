const router = require("express").Router();

const { authorization } = require("../middleware/auth");

const { userController } = require("../controllers");

router.get("", authorization, userController.getMe);

router.post("", authorization, userController.updateUser);
router.post("/change-password", authorization, userController.changePassword);

module.exports = router;
