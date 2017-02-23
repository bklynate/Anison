const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const Aniscrape = require('aniscrape'); // Check source on GitHub for more info.
const animebam = require('aniscrape-animebam');
const xray = require('x-ray')()
const scraper = new Aniscrape();

// line 7 allows for scripts in the public/js to work.
app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// app.engine('jsx', require('express-react-views').createEngine());
app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  scraper.use(animebam)
  .then(function() {
    scraper.search('boku no hero academia', 'animebam').then(function (results) {
      // console.log('RESULTS:', results)
      scraper.fetchSeries(results[0]).then(function(anime) {
        // console.log('ANIME:', anime.episodes[0].url)
        let url = anime.episodes[0].url
        console.log(url);
        var stream = xray(url, 'iframe.embed-responsive-item@src')(function(error, info) {
          return console.log(info);
        }).stream()
        stream.pipe(res);
      })
    })
  })
})

app.listen(app.get('port'), () => {
  console.log('Alive on port', app.get('port'));
})
