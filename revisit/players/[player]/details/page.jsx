// async function getPubMatchesForPro() {
//   return fetch(
//     `https://dota2protracker.com/player/${proPlayers.Sumail.D2PTName}`
//   )
//     .then(response => response.text())
//     .then(html => {
//       const $ = cheerio.load(html);
//       const rows = $('tr');

//       return rows
//         .slice(1)
//         .map((i, row) => {
//           return row.attribs;
//         })
//         .get();
//     })
//     .catch(error => {
//       console.error('Error fetching website:', error);
//     });
// }

// async function getPubMatchIdsForPro() {
//   return fetch(
//     `https://dota2protracker.com/player/${proPlayers.Sumail.D2PTName}`
//   )
//     .then(response => response.text())
//     .then(html => {
//       const $ = cheerio.load(html);
//       const links = $('a.dotabuff');
//       const matchIds = links
//         .map((i, link) => $(link).attr('href'))
//         .get()
//         .map(href => href.split('/')[4]);

//       return matchIds;
//     })
//     .catch(error => {
//       console.error('Error fetching website:', error);
//     });
// }

// async function getPubMatchDetails(matchId) {
//   const pubMatchQuery = `query Query {
//       match(id: ${matchId}) {
//         players {
//           hero {
//             displayName
//           }
//           imp
//           steamAccountId,
//           lane,
//           goldPerMinute,
//           experiencePerMinute
//           isVictory
//           kills
//           deaths
//           assists
//         }
//         midLaneOutcome
//         id
//         startDateTime
//       }
//   }`;

//   return fetch('https://api.stratz.com/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgwNzU3ODAwMDUiLCJ1bmlxdWVfbmFtZSI6IndsayBlc2ggaGF0aCIsIlN1YmplY3QiOiJkMjE4MzRiOS0zZjYxLTRmNDktYTZjZC1mYzU0YTIyNDgyN2UiLCJTdGVhbUlkIjoiMTE1NTE0Mjc3IiwibmJmIjoxNjg3ODM3NTM2LCJleHAiOjE3MTkzNzM1MzYsImlhdCI6MTY4NzgzNzUzNiwiaXNzIjoiaHR0cHM6Ly9hcGkuc3RyYXR6LmNvbSJ9.heMzGymYJqX8f5A1NSj8GKMzhhOfhzJ-qR1udLWtn58',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify({
//       query: pubMatchQuery,
//     }),
//   }).then(r => r.json());
// }

// export default async function Page({ params }) {
//   //   const proPlayer = proPlayers.Sumail;
//   // const response = await getPubMatchesForPro(proPlayer.D2PTName);
//   // let response = await getPubMatchDetails(7215698610);
//   // let match = response?.data?.match;
//   // const proPlayerData = match?.players?.filter(
//   //   player => player.steamAccountId === proPlayer.id
//   // )[0];
//   // const enemyMidHero = match?.players?.filter(
//   //   player =>
//   //     player.steamAccountId !== proPlayer.id && player.lane === 'MID_LANE'
//   // )[0].hero.displayName;

//   {
//     /* <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Hero
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Heroes With
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Heros Against
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Won/Loss
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {response?.map(match => {
//             return (
//               <tr key={match.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{match.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{match.hero}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{match.pwh}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{match.pah}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {match.won == 1 ? 'Won' : 'Lost'}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table> */
//   }

//   {
//     /* <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Hero
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Enemy Mid
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Radiant/Dire
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Mid Outcome
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Did Win
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Kills
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Deaths
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Assists
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Imp
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Gold Per Minute
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Experience Per Minute
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Time
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Match Id
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           <tr>
//             <td className="px-6 py-4 whitespace-nowrap">{proPlayer.name}</td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {proPlayerData.hero.displayName}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">{enemyMidHero}</td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {proPlayerData.isRadiant ? 'Radiant' : 'Dire'}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {match.midLaneOutcome}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {proPlayerData.isVictory ? 'Won' : 'Lost'}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {proPlayerData.kills}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {proPlayerData.deaths}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {proPlayerData.assists}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">{proPlayerData.imp}</td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {proPlayerData.goldPerMinute}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               {proPlayerData.experiencePerMinute}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">{match.startTime}</td>
//             <td className="px-6 py-4 whitespace-nowrap">{match.id}</td>
//           </tr>
//         </tbody>
//       </table> */
//   }
// }
