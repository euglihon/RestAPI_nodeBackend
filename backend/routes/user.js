const router = require("express").Router();
const { body } = require("express-validator/check");

const User = require("../models/user");

const userControllers = require("../controllers/user");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDocument) => {
          if (userDocument) {
            return Promise.reject("email address already exists!");
          }
        });
      })
      .normalizeEmail(),

    body("password").trim().isLength({ min: 8 }),

    body("name").trim().not().isEmpty(),
  ],

  userControllers.signup
);

router.post("/login", userControllers.login);

module.exports = router;
