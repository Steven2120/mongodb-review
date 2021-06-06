//imports express and morgan
const express = require("express");

const logger = require("morgan");

//initializes express
const app = express();

//imports userRouter.js
const userRouter = require("./routes/user/userRouter");

//allows use of morgan
app.use(logger("dev"));

//parses json()
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//sets path for userRouter.js in localhost
app.use("/api/user", userRouter);

//exports app.js
module.exports = app;
