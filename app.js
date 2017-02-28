const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server)
const Aniscrape = require('aniscrape'); // Check source on GitHub for more info.
const animebam = require('aniscrape-animebam');
const xray = require('x-ray')();
const scraper = new Aniscrape();
// for sockets io
var roomName;
var rooms = [roomName];
var animeTitle;
var animeUrl;

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  // let animeTitle = req.body.animeName;
  animeTitle = req.body.animeName;
  roomName = req.body.room;
  // console.log(animeTitle);
  scraper.use(animebam)
    .then(function() {
      scraper.search(animeTitle, 'animebam').then(function (results) {
        // console.log('RESULTS:', results)
        scraper.fetchSeries(results[0]).then(function(anime) {
          // saving all episode info to array
          // var epUrls = [];
          // var epNums = [];
          // var vidSrcs = [];
          // console.log(anime.episodes);
          // anime.episodes.forEach(function(e) {
          //   epUrls.push(e.url);
          //   epNums.push(e.title);
          // })
          // epUrls.forEach(function(e) {
          //   getAllVidSrc(e)
          // })
          // anime episodes
          let url = anime.episodes[0].url
          tempGetVidSrc(url);
          function tempGetVidSrc(url) {
            xray(url, 'iframe.embed-responsive-item@src')(function(error, info) {
              animeUrl = info;
              res.redirect("/" + roomName);
              // res.render('video_chat', {animeTitle: req.body.animeName, animeUrl: info, epUrls: epUrls, epNums: epNums, vidSrcs: vidSrcs, rooms: rooms[0]});
            })
          }
          // function getAllVidSrc(url) {
          //   xray(url, 'iframe.embed-responsive-item@src')(function(error, info) {
          //     vidSrcs.push(info);
          //     // console.log(vidSrcs);
          //     // console.log(url);
          //     // console.log(info); // logs the video src
          //     // console.log(req.body.animeName); // logs the form data
          //   })
          // }
        })
      })
    })
  });

app.get("/:roomName", function(req, res) {
  res.render("video_chat", {animeTitle: animeTitle, animeUrl: animeUrl, rooms: roomName});
})

// socket io
var users = [];
io.on("connection", function(socket) {
  // room
  socket.on("create room", function(data, callback) {
    if (rooms.indexOf(data) != -1) {
      console.log("false");
      callback(false);
    } else {
      console.log("true");
      callback(true);
      socket.room = data;
      rooms.push(socket.room);
      socket.join(data)
      io.in(data).emit("connectToRoom", "you are in room: " + data);
    }
  })
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
    io.emit("new message", {
        msg: data,
        user: socket.user
    })
  })
  // disconnect when closing to prevent memory leaks
  socket.on("disconnect", function() {
    if (!socket.user)
        return;
    users.splice(users.indexOf(socket.user), 1);
    updateUsers();
  })
  function updateUsers() {
    io.emit("usernames", users);
  }
})

// listening on server
server.listen(app.get('port'), function() {
	console.log(`Alive on PORT:${app.get('port')}`);
});
