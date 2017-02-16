const Anime = require('anime-scraper').Anime;

Anime.fromName('Haikyuu!!').then(function (anime) {
  anime.episodes[0].fetch().then(function (episode) {
    console.log(episode)
  })
});
