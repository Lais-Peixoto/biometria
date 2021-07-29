const express = require("express");
const { resolve } = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", express.static(resolve(__dirname, "./build")));

app.listen(process.env.PORT || 3001, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server is running on PORT " + process.env.PORT || "3001");
});
