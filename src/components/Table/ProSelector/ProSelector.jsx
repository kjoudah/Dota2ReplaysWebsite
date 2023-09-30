'use client';

import { MultiSelect, Button, Loader } from '@mantine/core';
import { useDebugValue, useEffect, useState } from 'react';
import ReplayResultsTable from '../Table';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ProSelector({ proList }) {
  const [pros, setPros] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, error, isLoading } = useSWR(
    shouldFetch ? `./replays?players=${pros.join(',')}` : null,
    fetcher
  );

  useDebugValue;
  async function getProPlayerReplays(proList) {
    if (pros.length != 0) {
      setShouldFetch(true);
    }
  }

  return (
    <>
      <MultiSelect
        label="Choose Pros"
        placeholder="Pick value"
        data={proList}
        onChange={setPros}
      />
      <Button onClick={() => getProPlayerReplays()} variant="filled">
        Get Replays
      </Button>
      {data && <ReplayResultsTable data={data} />}
      {isLoading && <Loader color="blue" />}
      {error && <div>error</div>}
    </>
  );
}
