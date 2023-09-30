'use client';

import { Table } from '@mantine/core';
import Link from 'next/link';

export default function ReplayResultsTable({ data }) {
  const elements = data.map(element => {
    return (
      <Table.Tr key={element['match-id']}>
        <Link href={`/matches/${element['match-id']}`}>
          <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.hero}</Table.Td>
          <Table.Td>{element.pwh}</Table.Td>
          <Table.Td>{element.pah}</Table.Td>
          <Table.Td>{element.won === '1' ? 'Won' : 'Lost'}</Table.Td>
          <Table.Td>{element['match-id']}</Table.Td>
        </Link>
      </Table.Tr>
    );
  });
  return (
    <Table>
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
