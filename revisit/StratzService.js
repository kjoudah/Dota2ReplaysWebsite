async function getMatchDetailsFromStratz(matchId) {
  const query = `
  query Query {
    match(id: ${matchId}) {
      players {
             hero {
               displayName
             }
             imp
             steamAccountId,
             lane,
             goldPerMinute,
             experiencePerMinute
             isVictory
             kills
            deaths
             assists
           }
           midLaneOutcome
           id
           startDateTime
         }
  }
    `;

  return fetch('https://api.stratz.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer --',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
    }),
  }).then(r => r.json());
}
