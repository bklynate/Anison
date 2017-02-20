const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static('public'));
// app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// app.set('port', process.env.PORT || 8080);

// socket io
io.on("connection", function(socket) {
	socket.on("send message", function(msg) {
		io.emit("new message", msg)
	})
})


app.get('/', require('./routes').index);

// app.listen(app.get('port'), () => {
//   console.log('Alive on port', app.get('port'));
// })

server.listen(3000, function() {
	console.log('Alive on port 3000');
})
