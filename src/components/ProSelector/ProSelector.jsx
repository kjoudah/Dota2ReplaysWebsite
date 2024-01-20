"use client";

import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import ReplayResultsTable from "../ReplayResultsTable/ReplayResultsTable";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProSelector({ proList }) {
  const [selectedPros, setSelectedPros] = useState([]);
  const { trigger, data, isMutating } = useSWRMutation(
    `./replays?players=${selectedPros.join(",")}`,
    fetcher
  );

  async function getProPlayerReplays(proList) {
    if (selectedPros.length != 0) {
      trigger();
    }
  }

  return (
    <div className="mx-auto p-8 w-full flex flex-col justify-center items-center gap-4">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-4">
          <MultiSelect
            className="w-64"
            value={selectedPros}
            onChange={(e) => setSelectedPros(e.value)}
            options={proList}
            optionLabel="label"
            selectedItemsLabel="{0} pros selected"
            optionGroupLabel="label"
            optionGroupChildren="players"
            placeholder="Select pros"
            maxSelectedLabels={1}
          />
          <Button label="Get Replays" onClick={() => getProPlayerReplays()} />
        </div>
        {isMutating && (
          <ProgressBar
            style={{ height: "1px", width: "100%" }}
            mode="indeterminate"></ProgressBar>
        )}
      </div>

      {data && <ReplayResultsTable data={data} />}
    </div>
  );
}
