const Aniscrape = require('aniscrape'); // Check source on GitHub for more info.
const animebam = require('aniscrape-animebam');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const scraper = new Aniscrape();
scraper.use(animebam)
.then(function() {
  scraper.search('boku no hero academia', 'animebam').then(function (results) {
    // console.log('RESULTS:', results)
    scraper.fetchSeries(results[0]).then(function(anime) {
      // console.log('ANIME:', anime.episodes[0].url)
      let url = anime.episodes[0].url
      console.log(url);
      request(url, function(error, response, html){
        if(!error){
          let $ = cheerio.load(html);
          console.log($.html());
          console.log($('.jw-video').attr('src'));
        }
      })
      // fs.writeFile('./public/js/anime.json', JSON.stringify(anime), function(err){
      //   if(err) throw err
      //   console.log("Object was saved");
      // })
    })
  })
})
