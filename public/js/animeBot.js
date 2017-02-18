var Aniscrape = require('aniscrape'); // Check source on GitHub for more info.
var animebam = require('aniscrape-animebam');

var scraper = new Aniscrape();
scraper.use(animebam)
.then(function() {
  scraper.search('Haikyuu', 'animebam').then(function (results) {
    console.log(results)
    scraper.fetchSeries(results[0]).then(function(anime) {
      console.log(anime)
      scraper.fetchVideo(anime.episodes[1]).then(function(video) {
        // Video is a list of direct video links and quality labels.
        console.log(video)
      })
    })
  })
})
