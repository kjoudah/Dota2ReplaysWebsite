"use client";
import { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";

export default function SearchByHero() {
  const [heroList, setHeroList] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [filteredHeroes, setFilteredHeroes] = useState(null);

  useEffect(() => {
    let getData = async () => {
      const data = await fetch("./heroes").then((res) => res.json());
      setHeroList(data);
    };
    getData();
  }, []);

  const search = (event) => {
    if (!event.query.trim().length) {
      setFilteredHeroes[heroList];
    } else {
      setFilteredHeroes(
        heroList.filter((hero) => {
          return hero.toLowerCase().startsWith(event.query.toLowerCase());
        })
      );
    }
  };

  return (
    <div className="mx-auto p-8 w-full flex flex-col justify-center items-center gap-4">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-4">
          {heroList && (
            <AutoComplete
              value={selectedHero}
              completeMethod={search}
              className="w-64"
              placeholder="Search by hero"
              suggestions={filteredHeroes}
              onChange={(e) => setSelectedHero(e.target.value)}
            />
          )}
          <Button label="Get Replays" onClick={() => getProPlayerReplays()} />
        </div>
      </div>
    </div>
  );
}
