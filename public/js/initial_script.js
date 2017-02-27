var socket = io();
var roomName = ["bleh"];
// rooms
$(".initialForm").submit(function(e) {
	socket.emit("create room", $("#room").val(), function(data) {
		$("#room").val("");
	})
})
socket.on("connectToRoom", function(data) {
	console.log(data);
	console.log("from initial js");
	roomName.push(data);
})

console.log(roomName);
