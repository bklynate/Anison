var Anime = require('anime-scraper').Anime

// You can also search and then choose manually
Anime.search('boku no hero academia').then(function (results) {
  // Same as above but uses the second search result rather than the first.
  results[1].toAnime().then(function (anime) {
    console.log(anime)
  })
})
