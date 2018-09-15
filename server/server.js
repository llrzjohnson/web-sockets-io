const express = require("express");
const path = require("path");

//create path variable
const publicPath = path.join(__dirname, "../public");

//setup environment for Heroku or local
const port = process.env.PORT || 3000;

//serve express as app
var app = express();

//use middleware publicPath to serve public folder
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Connected to ${port}`);
});
