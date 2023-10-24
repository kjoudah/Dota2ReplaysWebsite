'use client';

import { MultiSelect, Loader, Flex, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import ReplayResultsTable from '../ReplayResultsTable/ReplayResultsTable';
import ReplayResultsTableMUI from '../ReplayResultsTable/ReplayResultsTableMUI';
import MultipleSelect from '../MultipleSelect/MultipleSelect';
import { Container, Stack, Button, LinearProgress } from '@mui/material';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ProSelector({ proList }) {
  const [selectedPros, setSelectedPros] = useState([]);

  const { trigger, data, isMutating } = useSWRMutation(
    `./replays?players=${selectedPros.join(',')}`,
    fetcher
  );

  async function getProPlayerReplays(proList) {
    if (selectedPros.length != 0) {
      trigger();
    }
  }

  return (
    <Container maxWidth="lg">
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <MultipleSelect
            data={proList}
            onMultiSelectChange={data => {
              setSelectedPros(data);
            }}
          ></MultipleSelect>
          <Button
            sx={{
              p: 2,
            }}
            variant="contained"
            onClick={() => getProPlayerReplays()}
          >
            Get Replays
          </Button>
        </Stack>
        {isMutating && (
          <LinearProgress
            sx={{
              width: 800,
            }}
          />
        )}
        {/* {data && <ReplayResultsTable data={data} />} */}
        {data && <ReplayResultsTableMUI data={data} />}
      </Stack>
    </Container>
  );
}
