var socket = io();
// user
$(".userForm").submit(function(e) {
	e.preventDefault();
	socket.emit("new user", $("#username").val(), function(data) {
		if (data) {
			$(".userFormArea").hide();
			$(".chatArea").show();
		} else {
			$("#errorMsg").html("That username is already taken")
		}
	})
	$("#username").val("");
})
socket.on("usernames", function(data) {
	var html = "";
	for (i = 0; i < data.length; i++) {
		html += data[i] + "<br/>";
	}
	$(".users").html(html);
})
// chat
$(".messageForm").submit(function(e){
	e.preventDefault();
  socket.emit("send message", $("#message").val());
  $("#message").val("");
  return false;
});
socket.on("new message", function(data) {
	$("#messages").append("<li><strong>" + data.user + ": </strong>" + data.msg + "</li>");
})

