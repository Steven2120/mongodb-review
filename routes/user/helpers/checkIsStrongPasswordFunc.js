//import function from authMethods.js
const { checkIsStrongPassword } = require("../../utils/authMethods");
//creates function that checks if that password that is set by user does not meet reqs, advise so.
function checkIsStrongPasswordFunc(req, res, next) {
  //let errorObj = {};
  const { errorObj } = res.locals;
  //   if (!checkIsStrongPassword(req.body.password)) {
  //     errorObj.weakPassword =
  //       "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8";
  //   }
  next();
}
//export function
module.exports = checkIsStrongPasswordFunc;
