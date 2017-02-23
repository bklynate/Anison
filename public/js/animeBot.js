const Aniscrape = require('aniscrape'); // Check source on GitHub for more info.
const animebam = require('aniscrape-animebam');
const fs = require('fs');
const phantomjs = require('phantomjs-prebuilt');
const webdriverio = require('webdriverio');
const wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } }
const Horseman = require('node-horseman');
const horseman = new Horseman();

const scraper = new Aniscrape();
scraper.use(animebam)
.then(function() {
  scraper.search('one punch man', 'animebam').then(function (results) {
    // console.log('RESULTS:', results)
    scraper.fetchSeries(results[0]).then(function(anime) {
      // console.log('ANIME:', anime.episodes[0].url)
      let url = anime.episodes[11].url
      // console.log(url);
      horseman
        .userAgent('Chrome/41.0.2228.0')
        .open(url)
        .html()
        .then(html => {
          console.log();
        })
        .close();
    })
  })
})

