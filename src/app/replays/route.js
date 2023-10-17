import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { getPubMatchesForProsFromD2PT } from '../service/D2PTScraper';

async function getMatchIdsForPros(playerList) {
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
              const a = $(row).find('td.td-copy a');
              const matchId = a[0].attribs.data;

              return {
                'match-id': matchId,
                hero: row.attribs.hero,
                player: row.attribs.name,
              };
            })
            .get();
        });
    })
  );
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const players = searchParams.get('players').split(',');
  const d2PTData = await getPubMatchesForProsFromD2PT(players);

  return NextResponse.json(d2PTData.flat());
}
