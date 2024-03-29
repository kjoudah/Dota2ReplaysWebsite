async function getPubMatchDetails(matchId) {
  const pubMatchQuery = `query Query {
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
    }`;

  return fetch('https://api.stratz.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgwNzU3ODAwMDUiLCJ1bmlxdWVfbmFtZSI6IndsayBlc2ggaGF0aCIsIlN1YmplY3QiOiJkMjE4MzRiOS0zZjYxLTRmNDktYTZjZC1mYzU0YTIyNDgyN2UiLCJTdGVhbUlkIjoiMTE1NTE0Mjc3IiwibmJmIjoxNjg3ODM3NTM2LCJleHAiOjE3MTkzNzM1MzYsImlhdCI6MTY4NzgzNzUzNiwiaXNzIjoiaHR0cHM6Ly9hcGkuc3RyYXR6LmNvbSJ9.heMzGymYJqX8f5A1NSj8GKMzhhOfhzJ-qR1udLWtn58',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: pubMatchQuery,
    }),
  }).then(r => r.json());
}

export default async function Page({ params }) {
  const json = await getPubMatchDetails(params.id);
  return <p>{JSON.stringify(json)}</p>;
}
