const Aniscrape = require('aniscrape'); // Check source on GitHub for more info.
const animebam = require('aniscrape-animebam');
const fs = require('fs');

const scraper = new Aniscrape();
scraper.use(animebam)
.then(function() {
  scraper.search('boku no hero academia', 'animebam').then(function (results) {
    console.log('RESULTS:', results)
    scraper.fetchSeries(results[0]).then(function(anime) {
      console.log('ANIME:', anime)
      fs.write

    })
  })
})
