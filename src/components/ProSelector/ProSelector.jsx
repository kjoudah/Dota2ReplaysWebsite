'use client';

import { MultiSelect, Button, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import ReplayResultsTable from '../ReplayResultsTable/ReplayResultsTable';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ProSelector({ proList }) {
  const [pros, setPros] = useState([]);

  const { trigger, data, isMutating } = useSWRMutation(
    `./replays?players=${pros.join(',')}`,
    fetcher
  );

  async function getProPlayerReplays(proList) {
    if (pros.length != 0) {
      trigger();
    }
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <MultiSelect
        label="Choose Pros"
        placeholder="Pick value"
        data={proList}
        onChange={setPros}
        clearable
        hidePickedOptions
      />
      <Button onClick={() => getProPlayerReplays()} variant="filled">
        Get Replays
      </Button>
      {data && <ReplayResultsTable data={data} />}
      {isMutating && <Loader color="blue" />}
    </>
  );
}
