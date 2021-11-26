import type { NextPage, GetServerSideProps } from "next";
import Workspace from "../components/workspace/workspace";
import Clustersoverview from "../components/clustersoverview/clustersOverview";
import React, { useState } from "react";
import * as k8s from "@kubernetes/client-node";
import { Cluster, getAge, getStatusFromConditions } from "../lib/cluster";

type Props = {
  clusters?: Cluster[];
  children?: React.ReactNode;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  let clusters: Cluster[] = [];
  const kc = new k8s.KubeConfig();
  kc.loadFromFile("/home/felipeweb/projects/undistro/demos/cluster.kubeconfig");
  const k8sClient = kc.makeApiClient(k8s.CustomObjectsApi);
  const obj = await k8sClient.listClusterCustomObject(
    "app.undistro.io",
    "v1alpha1",
    "clusters"
  );
  const k8sObj = obj.body as k8s.KubernetesListObject<any>;
  clusters = k8sObj.items.map((cl, index) => {
    let machines = 0;
    let workers = cl.spec.workers as Array<any>;
    workers.forEach((w) => {
      machines += w.replicas as number;
    });
    let conditions = cl.status.conditions as Array<k8s.V1Condition>;
    if (
      cl.spec.controlPlane != undefined &&
      cl.spec.controlPlane.replicas != undefined
    ) {
      machines += cl.spec.controlPlane.replicas as number;
    }
    return {
      name: cl.metadata.name as string,
      provider: cl.spec.infrastructureProvider.name as string,
      flavor: cl.spec.infrastructureProvider.flavor as string,
      k8sVersion: cl.spec.kubernetesVersion as string,
      clusterGroup: cl.metadata.namespace as string,
      machines: machines,
      age: getAge(cl.metadata.creationTimestamp as string),
      status: getStatusFromConditions(conditions),
    };
  });
  return { props: { clusters: clusters } };
};

const Home: NextPage = (props: Props) => {
  return (
    <Workspace selectedClusters={[]}>
      <Clustersoverview clusters={props.clusters} />
    </Workspace>
  );
};

export default Home;
