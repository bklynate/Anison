const Aniscrape = require('aniscrape'); // Check source on GitHub for more info.
const animebam = require('aniscrape-animebam');
const fs = require('fs');
const xray = require('x-ray')()


scraper.use(animebam)
.then(function() {
  scraper.search('boku no hero academia', 'animebam').then(function (results) {
    // console.log('RESULTS:', results)
    scraper.fetchSeries(results[0]).then(function(anime) {
      // console.log('ANIME:', anime.episodes[0].url)
      let url = anime.episodes[0].url
      console.log(url);
      xray(url, 'iframe.embed-responsive-item@src')(function(error, info) {
        return console.log(info);
      })
    })
  })
})
