import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';
import { ImageList, ImageListItem, Stack } from '@mui/material';

function getResource(resourceLink) {
  return `https://dota2protracker.com${resourceLink}`;
}

function getTeamIconList(items) {
  return (
    <Stack direction="row">
      {items.map(item => (
        <Image width={30} height={30} alt={item} src={getResource(item)} />
      ))}
    </Stack>
  );
}

function getItemIconList(items) {
  return (
    <Stack spacing={1} direction="row">
      {items.map(item => (
        <Image
          width={30}
          height={30}
          alt={item.name}
          src={getResource(item.src)}
        />
      ))}
    </Stack>
  );
}

const columns = [
  {
    field: 'player',
    headerName: 'Player Name',
    width: 150,
    editable: false,
  },
  {
    field: 'playerHero',
    headerName: 'Player Hero',
    width: 100,
    editable: false,
    renderCell: params => (
      <Image
        width={50}
        height={50}
        alt={`${params.value.heroName}`}
        src={getResource(params.value.heroIcon)}
      />
    ),
  },
  {
    field: 'radiantHeros',
    headerName: 'Radiant',
    width: 250,
    editable: false,
    renderCell: params => getTeamIconList(params.value),
  },
  {
    field: 'direHeros',
    headerName: 'Dire',
    width: 250,
    editable: false,
    renderCell: params => getTeamIconList(params.value),
  },
  {
    field: 'items',
    headerName: 'Item Build',
    width: 325,
    editable: false,
    renderCell: params => getItemIconList(params.value),
  },
  {
    field: 'skills',
    headerName: 'Skill build',
    width: 325,
    editable: false,
    renderCell: params => getItemIconList(params.value),
  },
  {
    field: 'result',
    headerName: 'Result',
    height: 100,
    width: 100,
    editable: false,
  },
];

{
}

export default function ReplayResultsTableMUI({ data }) {
  return (
    <Box sx={{ height: 1000, width: 'auto' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
