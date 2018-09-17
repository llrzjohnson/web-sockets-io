const socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("Dicsonnected from server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
  let li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
  let li = $("<li></li>");
  let a = $('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}`);
  a.attr("href", message.url);
  li.append(a);
  $("#messages").append(li);
});

$("#message-form").on("submit", function(e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: $("[name=message]").val()
    },
    function() {}
  );
});

let locationButton = $("#send-location");

locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert("Unable to fetch your location");
    }
  );
});
