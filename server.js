//imports dotenv
require("dotenv").config();

//imports mongoose
const mongoose = require("mongoose");

//imports app.js
const app = require("./app");

//sets variable with value of 3000 to later use to log that the server is connected
const port = 3000;

//connects mongodb and names it backend-api sets both use keys to true to avoid error on terminal
mongoose
  .connect("mongodb://localhost:27017/backend-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server connected on ${port}`);
      console.log("Mongodb Connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });
