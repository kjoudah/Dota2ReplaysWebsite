import * as cheerio from 'cheerio';

export async function getPubMatchesForProsFromD2PT(playerList) {
  return Promise.all(
    playerList.map(player => {
      return fetch(
        `https://dota2protracker.com/player/${encodeURIComponent(player)}#`
      )
        .then(response => response.text())
        .then(html => {
          const $ = cheerio.load(html);
          const data = $('tr');

          return data
            .slice(1)
            .map((i, row) => {
              const radiantHeros = $(row)
                .find('.team-radiant img')
                .get()
                .map(item => {
                  return item.attribs.src;
                });
              const direHeros = $(row)
                .find('.team-dire img')
                .get()
                .map(item => {
                  return item.attribs.src;
                });
              const matchResult =
                $(row).get()[0].attribs.won == '1' ? 'Won' : 'Lost';
              return {
                player,
                radiantHeros,
                direHeros,
                result: matchResult,
              };
            })
            .get();
        });
    })
  );
}
