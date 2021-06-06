//imports express
const express = require("express");
//gives access to express.Router
const router = express.Router();
//imports signup and login from userController.js
const { signup, login } = require("./controller/userController");
//imports function below from checkIsUndefined.js
const checkIsUndefined = require("./helpers/checkIsUndefined");
//imports function below from checkIsEmptyFunc.js
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");
//imports function below from checkIsStrongPasswordFunc.js
const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");
//imports following functions from authMiddleware.js
const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");
//sets path for sign-up and calls following functions
router.post(
  "/sign-up",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  signup
);
//sets path for login and calls following functions
router.post(
  "/login",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);
//exports router
module.exports = router;
