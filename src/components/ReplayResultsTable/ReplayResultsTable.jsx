import { Button, Table } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

function getResource(resourceLink) {
  console.log(`https://dota2protracker.com${resourceLink}`);
  return `https://dota2protracker.com${resourceLink}`;
}

function getIconsForTeam(team) {
  return (
    <ul className="flex flex-row">
      {team.map(hero => {
        return (
          <li key={hero}>
            <Image
              width={50}
              height={50}
              alt={`${hero}`}
              src={getResource(hero)}
            ></Image>
          </li>
        );
      })}
    </ul>
  );
}

export default function ReplayResultsTable({ data }) {
  const elements = data.map(element => {
    return (
      <Table.Tr key={element.matchId}>
        <Table.Td>{element.player}</Table.Td>
        <Table.Td>
          <Image
            width={50}
            height={50}
            alt={`${element.playerHero.heroName}`}
            src={getResource(element.playerHero.heroIcon)}
          ></Image>
        </Table.Td>
        <Table.Td>{getIconsForTeam(element.radiantHeros)}</Table.Td>
        <Table.Td>{getIconsForTeam(element.direHeros)}</Table.Td>
        <Table.Td>{element.result}</Table.Td>
        <Table.Td>{element.matchId}</Table.Td>
        <Table.Td>
          <Link href={`https://stratz.com/matches/${element.matchId}`}>
            {' '}
            <Button>Details</Button>
          </Link>
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Player name</Table.Th>
          <Table.Th>Hero</Table.Th>
          <Table.Th>Heroes With</Table.Th>
          <Table.Th>Heroes against</Table.Th>
          <Table.Th>Result</Table.Th>
          <Table.Th>Match Id</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{elements}</Table.Tbody>
    </Table>
  );
}
