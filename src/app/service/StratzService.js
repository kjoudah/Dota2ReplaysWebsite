const base = (query) =>
  fetch("https://api.stratz.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRATZ_API_KEY}`,
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  }).then((r) => r.json());

async function getAllHeroes() {
  const query = `
    query Constants {
      constants { 
        heroes {
          displayName
        }
      }
    }
  `;
  return base(query).then((data) =>
    data.data.constants.heroes.map((hero) => hero.displayName)
  );
}

export { getAllHeroes };
