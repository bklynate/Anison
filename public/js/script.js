// chat
var socket = io();

$('form').submit(function(){
  socket.emit('send message', $('#message').val());
  $('#message').val('');
  return false;
});
socket.on("new message", function(msg) {
	$("#messages").append($("<li>").text(msg))
})