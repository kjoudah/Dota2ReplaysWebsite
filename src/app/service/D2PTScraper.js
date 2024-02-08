import * as cheerio from "cheerio";

export async function getPubMatchesForProsFromD2PT(playerList) {
  return Promise.all(
    playerList.map((player) => {
      return fetch(
        `https://dota2protracker.com/player/${encodeURIComponent(player)}#`
      )
        .then((response) => response.text())
        .then((html) => {
          const $ = cheerio.load(html);
          const data = $("tr");

          return data
            .slice(1)
            .map((i, row) => {
              const id = $(row).find("td.td-copy a")[0].attribs.data;
              const mmr = $(row).find("td.td-mmr").get()[0].children[0].data;
              const numberOfPros = $(row).find("td.td-np").get()[0]
                .children[0].data;
              const heroName = row.attribs.hero;
              const imp = $(row).find("td.td-imp").get()[0].children[0].data;
              const duration = $(row).find("td.td-dur").get()[0]
                .children[0].data;
              const startingItems = $(row)
                .find(".item-inventory-start .item-row .inventory-item")
                .get()
                .map((item) => {
                  const url = item.attribs.style.split(`('`)[1].split(`')`)[0];
                  return {
                    url,
                    name: url.split("/")[3].slice(0, -4),
                  };
                });

              const heroIcon = $(row)
                .find("td")
                .first()
                .children("div")
                .first()
                .children("img")[0].attribs.src;

              const radiantHeros = $(row)
                .find(".team-radiant img")
                .get()
                .map((item) => {
                  return item.attribs.src;
                });
              const direHeros = $(row)
                .find(".team-dire img")
                .get()
                .map((item) => {
                  return item.attribs.src;
                });
              const matchResult =
                $(row).get()[0].attribs.won == "1" ? "Won" : "Lost";
              const items = $(row)
                .find(".item_build .inventory-item")
                .get()
                .map((item) => {
                  const url = item.attribs.style.split(`('`)[1].split(`')`)[0];
                  const timing = item.children[0].data.trim();
                  return {
                    name: item.attribs.title,
                    src: url,
                    timing,
                  };
                });

              const skills = $(row)
                .find(".table-column-skillbuild img")
                .get()
                .map((skill) => {
                  return {
                    src: skill.attribs.src,
                    alt: skill.attribs.alt,
                  };
                });

              return {
                id,
                mmr,
                imp,
                duration,
                numberOfPros,
                playerHero: {
                  heroName: heroName,
                  heroIcon: heroIcon,
                },
                player,
                draft: radiantHeros.concat(direHeros),
                result: matchResult,
                items,
                skills,
                startingItems,
              };
            })
            .get();
        });
    })
  );
}
