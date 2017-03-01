const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server)
const Aniscrape = require('aniscrape'); // Check source on GitHub for more info.
const animebam = require('aniscrape-animebam');
const xray = require('x-ray')();
const scraper = new Aniscrape();

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  let animeTitle = req.body.animeName;
  // console.log(animeTitle);
  scraper.use(animebam)
    .then(function() {
      scraper.search(animeTitle, 'animebam').then(function (results) {
        // console.log('RESULTS:', results)
        scraper.fetchSeries(results[0]).then(function(anime) {
          // saving all episode info to array
          var epUrls = [];
          var epNums = [];
          var vidSrcs = [];

          // this line grabs the url and title of each
          // episode
          anime.episodes.forEach(function(e) {
            epUrls.push(e.url);
            epNums.push(e.title);
          })

          // this for each grabs the video srcs for every
          // episode.
          epUrls.forEach(function(e) {
            // this .then says once getAllVidSrcs has ran
            // then do this - making the async data call behave
            // like synchronously
            getAllVidSrcs(e).then(function(src){
              vidSrcs.push(src)
            })
          })

          // anime episodes
          let url = anime.episodes[0].url
          getPlayingVidSrc(url);

          function getPlayingVidSrc(url) {
            xray(url, 'iframe.embed-responsive-item@src')(function(error, info) {
              res.render('video_chat', {animeTitle: req.body.animeName, animeUrl: info, epUrls: epUrls, epNums: epNums, vidSrcs: vidSrcs});
            })
          }
          // getAllVidSrcs is a function that returns a promise
          // that scrapes all the video srcs
          function getAllVidSrcs(url) {
            return new Promise(function(resolve, reject) {
              xray(url, 'iframe.embed-responsive-item@src')(function(error, info){
                if(error) {
                  reject(error)
                } else {
                  resolve(info)
                }
              })
            })
          }
        })
      })
    })
  });


// socket io
var users = [];
io.sockets.on("connection", function(socket) {
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
