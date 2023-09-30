import * as cheerio from 'cheerio';

async function getPubMatchesForPro(proD2PtName) {
  return fetch(`https://dota2protracker.com/player/${proD2PtName}`)
    .then(response => response.text())
    .then(html => {
      const $ = cheerio.load(html);
      const rows = $('tr');

      return rows
        .slice(1)
        .map((i, row) => {
          return row.attribs;
        })
        .get();
    })
    .catch(error => {
      console.error('Error fetching website:', error);
    });
}

export default async function Page({ params }) {
  const response = await getPubMatchesForPro(params.player);
  return (
    <main>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hero
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Heroes With
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Heros Against
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Won/Loss
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {response?.map(match => {
            return (
              <tr key={match.id}>
                <td className="px-6 py-4 whitespace-nowrap">{match.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{match.hero}</td>
                <td className="px-6 py-4 whitespace-nowrap">{match.pwh}</td>
                <td className="px-6 py-4 whitespace-nowrap">{match.pah}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {match.won == 1 ? 'Won' : 'Lost'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
