var Anime = require('anime-scraper').Anime

// Searches for anime using a POST request & uses first result
Anime.fromName('Sword Art Online').then(function (anime) {
  console.log(anime)
})

// You can also search and then choose manually
Anime.search('Sword Art Online').then(function (results) {
  // Same as above but uses the second search result rather than the first.
  results[1].toAnime().then(function (anime) {
    console.log(anime)
  })
})
