const { body } = require("express-validator");

const registerValidation = [
  body("username")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3-15 characters long")
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/)
    .withMessage("Username contains invalid characters"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name can only contain alphabets and spaces"),

  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[a-z]/)
    .withMessage("Must include a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Must include an uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Must include a number")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Must include a special character")
    .custom((val) => {
      const specials = val.match(/[^a-zA-Z0-9]/g);
      if (!specials || specials.length !== 1) {
        throw new Error("Password must contain exactly one special character");
      }
      return true;
    }),
];

module.exports = { registerValidation };
