'use client';

// import { MultiSelect, Loader, Flex, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import ReplayResultsTable from '../ReplayResultsTable/ReplayResultsTable';
import ReplayResultsTableMUI from '../ReplayResultsTable/ReplayResultsTableMUI';
import MultipleSelect from '../MultipleSelect/MultipleSelect';
// import { Container, Stack, Button, LinearProgress } from '@mui/material';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import ReplayResultsTablePrimereact from '../ReplayResultsTable/ReplayResultsTablePrimereact';

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
  const cities = [
    { name: 'New York' },
    { name: 'Rome' },
    { name: 'London' },
    { name: 'Istanbul' },
    { name: 'Paris' },
  ];
  {
    /* <MultipleSelect
          data={proList}
          onMultiSelectChange={data => {
            setSelectedPros(data);
          }}
        ></MultipleSelect> */
  }

  return (
    <div className="w-full m-8 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-4">
          <MultiSelect
            value={selectedPros}
            onChange={e => setSelectedPros(e.value)}
            options={proList}
            placeholder="Select pros"
            maxSelectedLabels={5}
            className="w-96"
          />
          <Button label="Get Replays" onClick={() => getProPlayerReplays()} />
        </div>
        {isMutating && (
          <ProgressBar
            style={{ height: '2px', width: '100%' }}
            mode="indeterminate"
          ></ProgressBar>
        )}
      </div>

      {data && <ReplayResultsTablePrimereact data={data} />}
    </div>
  );
}
