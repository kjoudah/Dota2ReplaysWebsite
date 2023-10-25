import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Image from 'next/image';
import { Button, ImageList, ImageListItem, Stack, Grid } from '@mui/material';
import Link from 'next/link';

function getResource(resourceLink) {
  return `https://dota2protracker.com${resourceLink}`;
}

function getStratzLink(matchId) {
  return `https://stratz.com/matches/${matchId}`;
}

function getTeamIconList(items) {
  return (
    <Stack direction="row">
      {items.map(item => (
        <Image
          key={item}
          width={30}
          height={30}
          alt={item}
          src={getResource(item)}
        />
      ))}
    </Stack>
  );
}

function getItemIconList(items) {
  return (
    <Grid spacing={1} wrap="wrap" direction="row">
      {items.map(item => (
        <Image
          key={item}
          width={30}
          height={30}
          alt={item.name}
          src={getResource(item.src)}
        />
      ))}
    </Grid>
  );
}

const columns = [
  {
    field: 'player',
    headerName: 'Player Name',
    editable: false,
  },
  {
    field: 'playerHero',
    headerName: 'Player Hero',
    width: 100,
    editable: false,
    sortComparator: (v1, v2) => v1.heroName.localeCompare(v2.heroName),
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
    editable: false,
    disableColumnMenu: true,
    sortable: false,
    width: 300,
    renderCell: params => getTeamIconList(params.value),
  },
  {
    field: 'direHeros',
    editable: false,
    disableColumnMenu: true,
    sortable: false,
    width: 300,
    renderCell: params => getTeamIconList(params.value),
  },
  {
    field: 'items',
    headerName: 'Item Build',
    width: 750,
    sortable: false,
    disableColumnMenu: true,
    editable: false,
    renderCell: params => getItemIconList(params.value),
  },
  {
    field: 'skills',
    headerName: 'Skill build',
    sortable: false,
    minWidth: 600,
    disableColumnMenu: true,
    editable: false,
    renderCell: params => getItemIconList(params.value),
  },
  {
    field: 'result',
    headerName: 'Result',
    width: 150,
    editable: false,
  },
  {
    field: 'id',
    headerName: 'Details',
    width: 200,
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
    editable: false,
    renderCell: params => (
      <Link target="_blank" href={getStratzLink(params.value)}>
        <Button variant="contained">Get Details</Button>
      </Link>
    ),
  },
];

export default function ReplayResultsTableMUI({ data }) {
  return (
    <Box sx={{ height: 1000, width: '100%' }}>
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
