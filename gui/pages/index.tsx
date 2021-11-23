import type { NextPage } from "next";
import Workspace from "../components/workspace/workspace";
import Clustersoverview from "../components/clustersoverview/clustersOverview";
import React, { useState } from "react";

type Props = {};

const Home: NextPage = (props: Props) => {
  const [seletedClusters, setSelectedClusters] = useState<Set<string>>();
  let selected: Set<string> = new Set<string>(seletedClusters);
  const selectCluster = (cluster: string): void => {
    if (selected.has(cluster)) {
      selected.delete(cluster);
    } else {
      selected.add(cluster);
    }
    setSelectedClusters(selected);
  };
  return (
    <Workspace selectedClusters={Array.from(selected.values())}>
      <Clustersoverview selectCluster={selectCluster} />
    </Workspace>
  );
};

export default Home;
