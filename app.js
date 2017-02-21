const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static('public'));
// app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// app.set('port', process.env.PORT || 8080);

var users = [];
// socket io
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

	// send message
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


app.get('/', require('./routes').index);

// app.listen(app.get('port'), () => {
//   console.log('Alive on port', app.get('port'));
// })

server.listen(3000, function() {
	console.log('Alive on port 3000');
})
