//imports bcryptjs to assist with password generation
const bcrypt = require("bcryptjs");

//import User.js where the Schema is located
const User = require("../model/User");

//imports jsonwebtoken
const jwt = require("jsonwebtoken");

//creates async function named signup. this function will be exported and imported to userRouter.js where a path will also be created
async function signup(req, res) {
  //sets 5 variable using object destructuring with values of what will be entered in body when signing up
  const { username, email, password, firstName, lastName } = req.body;
  const { errorObj } = res.locals;
  //if there is any error return message: failure and the errorObj
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  //initiates bcrypt.genSalt and hashedPassword that will assist in generating password
  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);
    //creates variable with a new User object and sets all keys that client will be able to create
    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    //initiates variable with value of the created User that client made
    let savedUser = await createdUser.save();
    //displays message and the savedUser info
    res.json({ message: "success", data: savedUser });
    //logs error on terminal including what the error is
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}
//initiates login async function
async function login(req, res) {
  //creates 2 variables using object destructuring. they have values of what will be added on the body
  const { email, password } = req.body;

  const { errorObj } = res.locals;
  //if there is an error display json message of failure and the error object
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  try {
    //creates variable with value of locating email on user
    let foundUser = await User.findOne({ email: email });
    //if none is found, display failure message
    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
      //if it is found, initiate variable that has a value of comparing the password entered by client to the password that belongs the that user
    } else {
      //password = 1, foundUser.password = $2a$12$tauL3AEb5gvKdcQdDKNWLeIYv422jNq2aRsaNWF5J4TdcWEdhq4CO
      let comparedPassword = await bcrypt.compare(password, foundUser.password);
      //if passwords do not match, display error message
      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
        //if passwords match, initiate variable with value of a signature token and display success message
      } else {
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "1d",
          }
        );
        res.json({ message: "success", payload: jwtToken });
      }
    }
    //catches any errors and displays them
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}
//exports both async functions
module.exports = { signup, login };
