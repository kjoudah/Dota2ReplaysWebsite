import { Button, Table } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

function getHeroIconLink(heroName) {
  const lowercaseName = heroName
    .split(' ')
    .map(string => string.toLowerCase())
    .join('_');
  return `https://cdn.stratz.com/images/dota2/heroes/${lowercaseName}_icon.png`;
}

function getIconsForTeam(team) {
  return (
    <ul className="flex flex-row">
      {team
        .split(',')
        .map(string => string.toLowerCase())
        .map(hero => {
          return (
            <li key={hero}>
              <Image
                width={50}
                height={50}
                alt={`${hero}`}
                src={getHeroIconLink(hero)}
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
      <Table.Tr key={element['match-id']}>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>
          <Image
            width={50}
            height={50}
            alt={`${element.hero}`}
            src={getHeroIconLink(element.hero)}
          ></Image>
        </Table.Td>
        <Table.Td>{getIconsForTeam(element.pwh)}</Table.Td>
        <Table.Td>{getIconsForTeam(element.pah)}</Table.Td>
        <Table.Td>{element.won === '1' ? 'Won' : 'Lost'}</Table.Td>
        <Table.Td>{element['match-id']}</Table.Td>
        <Table.Td>
          <Link href={`https://stratz.com/matches/${element['match-id']}`}>
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
