'use client';

import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import ReplayResultsTable from '../ReplayResultsTable/ReplayResultsTable';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function ProSelector({ proList }) {
  const [selectedPros, setSelectedPros] = useState([]);
  const { trigger, data, isMutating } = useSWRMutation(
    `./replays?players=${selectedPros.join(',')}`,
    fetcher
  );

  useEffect(() => {
    console.log(selectedPros);
  }, [selectedPros]);

  async function getProPlayerReplays(proList) {
    if (selectedPros.length != 0) {
      trigger();
    }
  }

  return (
    <div className="w-full m-8 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-4">
          <MultiSelect
            value={selectedPros}
            onChange={e => setSelectedPros(e.value)}
            options={proList}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="players"
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

      {data && <ReplayResultsTable data={data} />}
    </div>
  );
}
