var Anime = require('malapi').Anime;

Anime.fromName('boku no hero academia').then(anime => {
  console.log(anime.episodesLink);

  let boku = anime

  boku.getEpisodes().then(episodes => {
    console.log("Episodes:",episodes);
  });
});
