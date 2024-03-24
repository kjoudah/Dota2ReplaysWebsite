import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import Image from "next/image";

export default function ReplayResultsTable({ data }) {
  function getResource(resourceLink) {
    return `https://dota2protracker.com${resourceLink}`;
  }

  function getStratzLink(matchId) {
    return `https://stratz.com/matches/${matchId}`;
  }

  const playerNameTemplate = (playerData) => {
    return (
      <p
        className={`${
          playerData.result == "Lost" ? "text-red-600" : "text-green-600"
        } text-center`}>
        {playerData.player}
      </p>
    );
  };

  const playerHeroTemplate = (playerData) => {
    return (
      <Image
        className="mx-auto"
        width={40}
        height={40}
        alt={`${playerData.playerHero.heroName}`}
        src={getResource(playerData.playerHero.heroIcon)}
      />
    );
  };

  const draftTemplate = (playerData) => {
    const radiantHeroes = playerData.draft.slice(0, 5);
    const direHeroes = playerData.draft.slice(5);
    return (
      <div className="flex flex-col gap-1 w-[150px] mx-auto">
        <div className="flex flex-row gap-1">
          {radiantHeroes.map((hero) => (
            <Image
              key={hero}
              width={40}
              height={40}
              alt={hero}
              src={getResource(hero)}
            />
          ))}
        </div>
        <div className="flex flex-row gap-1">
          {direHeroes.map((hero) => (
            <Image
              key={hero}
              width={40}
              height={40}
              alt={hero}
              src={getResource(hero)}
            />
          ))}
        </div>
      </div>
    );
  };

  const startingItemsTemplate = (playerData) => {
    return (
      <div className="flex flex-row gap-1 w-32 flex-wrap">
        {playerData.startingItems.map((item) => (
          <Image
            key={item.name}
            width={35}
            height={35}
            alt={item.name}
            src={getResource(item.url)}
          />
        ))}
      </div>
    );
  };

  const itemsTemplate = (playerData) => {
    return (
      <div className="flex flex-row gap-2 flex-wrap">
        {playerData.items.map((item) => (
          <div className="relative" key={item.name}>
            <i className="text-xs font-bold absolute top-0 right-0">
              {item.timing}
            </i>
            <Image
              width={35}
              height={35}
              alt={item.name}
              src={getResource(item.src)}
            />
          </div>
        ))}
      </div>
    );
  };

  const skillsTemplate = (playerData) => {
    return (
      <div className="flex flex-row gap-1 flex-wrap">
        {playerData.skills.map((skill) => (
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

  const openNewTab = (event) => {
    const link = getStratzLink(event.data.id);
    const tab = window.open(link, "_blank");
    tab.focus();
  };

  const copyMatchIdTemplate = (playerData) => {
    return (
      <Button text onClick={() => navigator.clipboard.writeText(playerData.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
      </Button>
    );
  };

  const [filters, setFilters] = useState({
    player: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "playerHero.heroName": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    draft: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const heroCounts = Array.from(
    data
      .map((item) => item.playerHero.heroIcon)
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
    <Card>
      <DataTable
        dataKey="id"
        rowHover={true}
        filters={filters}
        onRowClick={(e) => openNewTab(e)}
        footer={footer}
        filterDisplay="row"
        paginator
        rows={15}
        value={data}>
        <Column
          className="min-w-[100px]"
          headerClassName="min-w-[100px]"
          filter
          align="center"
          filterField="player"
          filterPlaceholder="Filter by name"
          showFilterMenu={false}
          body={playerNameTemplate}
          header="Player name"></Column>

        <Column
          className="min-w-[100px]"
          headerClassName="min-w-[100px]"
          filter
          filterPlaceholder="Filter by hero"
          showFilterMenu={false}
          filterField="playerHero.heroName"
          field="playerHero"
          header="Player Hero"
          body={playerHeroTemplate}></Column>

        <Column
          className="w-[300px]"
          headerClassName="w-[300px] "
          alignHeader="center"
          header="Draft"
          filter
          showFilterMenu={false}
          filterField="draft"
          body={draftTemplate}></Column>
        <Column
          className="hidden lg:table-cell min-w-[200px]"
          headerClassName="hidden lg:table-cell min-w-[200px]"
          field="startingItems"
          header="Starting items"
          alignHeader="center"
          body={startingItemsTemplate}></Column>

        <Column
          className="hidden lg:table-cell"
          headerClassName="hidden lg:table-cell"
          field="items"
          bodyStyle={{
            minWidth: "200px",
          }}
          header="Items"
          body={itemsTemplate}></Column>

        <Column
          className="hidden xl:table-cell"
          headerClassName="hidden xl:table-cell"
          field="skills"
          bodyStyle={{
            minWidth: "200px",
          }}
          header="Skill build"
          body={skillsTemplate}></Column>

        <Column
          className="hidden md:table-cell"
          headerClassName="hidden md:table-cell"
          field="id"
          header="Match ID"
          body={copyMatchIdTemplate}></Column>
      </DataTable>
    </Card>
  );
}
