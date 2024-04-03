"use client";

import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { TreeSelect } from "primereact/treeselect";
import { ProgressBar } from "primereact/progressbar";
import ReplayResultsTable from "../ReplayResultsTable/ReplayResultsTable";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProSelector({ proList }) {
  const [pros, setPros] = useState([]);
  const [selectedPros, setSelectedPros] = useState(null);
  const { trigger, data, isMutating } = useSWRMutation(
    `./replays?players=${pros.join(",")}`,
    fetcher
  );

  const roles = proList.map((pro) => pro.label);

  useEffect(() => {
    selectedPros &&
      setPros(Object.keys(selectedPros).filter((pro) => !roles.includes(pro)));
  }, [selectedPros]);

  async function getProPlayerReplays(proList) {
    if (pros.length != 0) {
      trigger();
    }
  }

  const items = proList.map((pro) => ({
    key: pro.label,
    label: pro.label,
    data: pro.label,
    children: pro.players.map((player) => ({
      key: player.label,
      label: player.label,
      data: player.label,
    })),
  }));

  return (
    <div className="mx-auto p-8 w-full flex flex-col justify-center items-center gap-4">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-4">
          <TreeSelect
            placeholder="Select a Pro"
            className="w-64"
            value={selectedPros}
            onChange={(e) => setSelectedPros(e.value)}
            options={items}
            display="chip"
            selectionMode="checkbox"></TreeSelect>
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
