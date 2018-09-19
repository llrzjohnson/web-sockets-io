const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");

const { generateMessage, generateLocationMessage } = require("./utils/message");

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

let users = new Users();

//use middleware publicPath to serve public folder
app.use(express.static(publicPath));

// initiate io to listen for connecting and disconnecting clients (event)
io.on("connection", socket => {
  console.log("New user connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("A valid name and room name are required.");
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    //socket.leave
    //io.emit
    //socket.broadcast.emit
    //socket.emit

    //socket.emit from Admin to welcome to the chat app
    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the chat app")
    );

    //socket.broadcast.emit from Admin to announce joinng chat app
    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined ${params.room}`)
      );

    callback();
  });

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });

  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin ", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left.`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Connected to ${port}`);
});
