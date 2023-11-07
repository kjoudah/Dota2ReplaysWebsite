import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import Image from 'next/image';
import Link from 'next/link';

export default function ReplayResultsTable({ data }) {
  function getResource(resourceLink) {
    return `https://dota2protracker.com${resourceLink}`;
  }

  function getStratzLink(matchId) {
    return `https://stratz.com/matches/${matchId}`;
  }

  const playerHeroTemplate = playerData => {
    return (
      <Image
        width={40}
        height={40}
        alt={`${playerData.playerHero.heroName}`}
        src={getResource(playerData.playerHero.heroIcon)}
      />
    );
  };

  const draftTemplate = playerData => {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1">
          {playerData.radiantHeros.map(hero => (
            <Image
              key={hero}
              width={30}
              height={30}
              alt={hero}
              src={getResource(hero)}
            />
          ))}
        </div>
        <div className="flex flex-row gap-1">
          {playerData.direHeros.map(hero => (
            <Image
              key={hero}
              width={30}
              height={30}
              alt={hero}
              src={getResource(hero)}
            />
          ))}
        </div>
      </div>
    );
  };

  const itemsTemplate = playerData => {
    return (
      <div className="flex flex-row gap-1">
        {playerData.items.map(item => (
          <Image
            key={item.name}
            width={30}
            height={30}
            alt={item.name}
            src={getResource(item.src)}
          />
        ))}
      </div>
    );
  };

  const skillsTemplate = playerData => {
    return (
      <div className="flex flex-row gap-1">
        {playerData.skills.map(skill => (
          <Image
            key={skill.name}
            width={30}
            height={30}
            alt={skill.name}
            src={getResource(skill.src)}
          />
        ))}
      </div>
    );
  };

  const copyMatchIdTemplate = playerData => {
    return (
      <Button text onClick={() => navigator.clipboard.writeText(playerData.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
      </Button>
    );
  };

  const getDetailsTemplate = playerData => {
    return (
      <Link target="_blank" href={getStratzLink(playerData.id)}>
        <Button variant="contained">Get Details</Button>
      </Link>
    );
  };

  const [filters, setFilters] = useState({
    player: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'playerHero.heroName': {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  const heroCounts = Array.from(
    data
      .map(item => item.playerHero.heroIcon)
      .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
  )
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value);

  const footer = (
    <div className="flex flex-row flex-wrap px-8">
      {heroCounts.map(({ key, value }) => {
        return (
          <div className="flex items-center flex-row mx-2" key={key}>
            <Image
              width={25}
              height={25}
              alt={`${key}`}
              src={getResource(key)}
            />
            <p>: {value}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="card">
      <DataTable
        dataKey="id"
        filters={filters}
        footer={footer}
        filterDisplay="row"
        paginator
        rows={15}
        value={data}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          filter
          filterPlaceholder="Search by name"
          showFilterMenu={false}
          field="player"
          header="Player name"
        ></Column>
        <Column
          filter
          filterPlaceholder="Search by hero"
          showFilterMenu={false}
          filterField="playerHero.heroName"
          field="playerHero"
          header="Player Hero"
          body={playerHeroTemplate}
        ></Column>
        <Column field="playerHero" body={draftTemplate}></Column>
        <Column field="items" header="Items" body={itemsTemplate}></Column>
        <Column
          field="skills"
          header="Skill build"
          body={skillsTemplate}
        ></Column>
        <Column field="result" header="Result"></Column>
        <Column sortable field="mmr" header="MMR"></Column>
        <Column sortable field="imp" header="IMP"></Column>
        <Column sortable field="numberOfPros" header="Pros"></Column>
        <Column field="duration" header="Duration"></Column>
        <Column
          field="id"
          header="Match ID"
          body={copyMatchIdTemplate}
        ></Column>
        <Column field="id" body={getDetailsTemplate}></Column>
      </DataTable>
    </div>
  );
}
