const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

//create path variable
const publicPath = path.join(__dirname, "../public");
//setup environment for Heroku or local
const port = process.env.PORT || 3000;
//serve express as app
let app = express();
//socketIO prep
let server = http.createServer(app);
//setup server for web sockets
let io = socketIO(server);
//use middleware publicPath to serve public folder
app.use(express.static(publicPath));

// initiate io to listen for connecting and disconnecting clients (event)
io.on("connection", socket => {
  console.log("New user connected");
  socket.on("disconnect", () => {
    console.log("User dicsonnected from server");
  });
});

server.listen(port, () => {
  console.log(`Connected to ${port}`);
});
