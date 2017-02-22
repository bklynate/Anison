const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const animeBot = require('./public/js/animeBot.js')

app
	.use(express.static('public'))
	.set('view engine', 'jsx')
	.engine('jsx', require('express-react-views').createEngine())
	.get('/', require('./routes').index)

// socket io
var users = [];
io.on("connection", function(socket) {
	// users 
	socket.on("new user", function(data, callback) {
		if (users.indexOf(data) != -1) {
			callback(false);
		} else {
			callback(true);
			socket.user = data;
			users.push(socket.user);
			updateUsers();
		}
	})
	// chat
	socket.on("send message", function(data) {
		io.emit("new message", {msg: data, user: socket.user})
	})
	socket.on("disconnect", function() {
		if (!socket.user) return;
		users.splice(users.indexOf(socket.user), 1);
		updateUsers();
	})
	function updateUsers() {
		io.emit("usernames", users);
	}
})

// listening on server
server.listen(3000, function() {
	console.log('Alive on port 3000');
})
