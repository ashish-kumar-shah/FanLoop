const validator = require("validator");

// Username: 3–15 chars, alphanumeric + special chars
function validateUsername(username) {
  const isValid =
    typeof username === "string" &&
    username.length >= 3 &&
    username.length <= 15;

  return isValid
    ? { valid: true }
    : { valid: false, message: "Username must be 3–15 characters long." };
}

// Name: Alphabets only
function validateName(name) {
  const isValid = /^[A-Za-z\s]+$/.test(name);
  return isValid
    ? { valid: true }
    : { valid: false, message: "Name must contain only letters." };
}

// Email: valid structure + allowed domains
function validateEmail(email) {
  const isValid = validator.isEmail(email);
  return isValid
    ? { valid: true }
    : { valid: false, message: "Email is not valid." };
}

// Password: min 8 chars, 1 lowercase, 1 uppercase, 1 digit, 1 special char
function validatePassword(password) {
  const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(
    password
  );
  return isValid
    ? { valid: true }
    : {
        valid: false,
        message:
          "Password must have 8+ chars with uppercase, lowercase, digit & special char.",
      };
}

module.exports = {
  validateUsername,
  validateName,
  validateEmail,
  validatePassword,
};
