const {
  registerController,
  loginController,
  userController,
} = require("../controllers/authController");

const router = require("express").Router();

router.get("/users", userController);
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
