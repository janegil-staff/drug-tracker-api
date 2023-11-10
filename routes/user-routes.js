const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", usersController.signup, [
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 }),
]);

router.post("/login", usersController.login);

router.use(checkAuth);

router.get("/", usersController.getUser);
module.exports = router;
