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
    width: 250,
    renderCell: params => getTeamIconList(params.value),
  },
  {
    field: 'direHeros',
    editable: false,
    disableColumnMenu: true,
    sortable: false,
    width: 250,
    renderCell: params => getTeamIconList(params.value),
  },
  {
    field: 'items',
    headerName: 'Item Build',
    width: 600,
    sortable: false,
    disableColumnMenu: true,
    editable: false,
    renderCell: params => getItemIconList(params.value),
  },
  {
    field: 'skills',
    headerName: 'Skill build',
    sortable: false,
    width: 600,
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
    field: 'copyId',
    headerName: 'Copy Match ID',
    width: 200,
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
    editable: false,
    valueGetter: params => {
      return params.row.id;
    },
    renderCell: params => (
      <Button onClick={() => navigator.clipboard.writeText(params.value)}>
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
    ),
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
