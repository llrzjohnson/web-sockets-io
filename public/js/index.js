const socket = io();

socket.on("connect", function() {
  console.log("connected to server");

  socket.on("newMessage", function(message) {
    console.log("Received this message from server:", message);
  });
});

socket.on("disconnect", function() {
  console.log("dicsonnected from server");
});
