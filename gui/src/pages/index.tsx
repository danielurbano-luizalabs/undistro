// import * as k8s from '@kubernetes/client-node'
import React from 'react'
import Cookies from 'js-cookie'
import type { GetServerSideProps, NextPage } from 'next'

import ClustersOverview from '@/components/Overview/Clusters/ClustersOverview'
import Workspace from '@/components/Workspace/Workspace'

import api from '@/lib/axios'
import { Cluster, getAge, getStatusFromConditions } from '@/lib/cluster'
import { useFetch } from '@/hooks/query'
import { btoa } from '@/helpers/encoding'
// import { createAuthorizationHeader } from '@/lib/auth'

type Props = {
  clusters?: Cluster[]
  selectedClusters?: string[]
  children?: React.ReactNode
  page?: string
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { req, query } = context
  const { cookies } = req

  let selectedClusters: string[] = []
  const { cluster, page } = query
  let pageVar = '1'
  if (page != undefined) {
    pageVar = page as string
  }
  if (cluster != undefined) {
    if (!(cluster instanceof Array)) {
      selectedClusters = [cluster]
    } else {
      selectedClusters = cluster
    }
  }

  let clusters: Cluster[] = [...Array(100)].map((_, i) => ({
    name: `cluster${i}`,
    provider: 'aws',
    flavor: 'ec2',
    k8sVersion: 'v1.21.2',
    clusterGroup: 'undistro-system',
    machines: 4,
    age: '2d4h',
    status: 'ready'
  }))

  // await api.get('/clusters').then(res => {}).catch(err => {
  //   console.log(err)
  // })

  // BaseUrl: /uapi/_/apis/app.undistro.io/v1alpha1/clusters

  // console.log(data)
  // BaseUrl: /uapi/v1/namespaces/{ns}/clusters/{cln}/proxy/
  // const data = await api(`/uapi/v1/namespaces/{ns}/clusters/{cln}/proxy/apis/app.undistro.io/v1alpha1/clusters`).catch(
  //   e => console.log(e)
  // )

  // let clusters = [];
  // {
  //   const kc = new k8s.KubeConfig();
  //   kc.loadFromFile(
  //     "/home/felipeweb/projects/undistro/demos/cluster.kubeconfig"
  //   );
  //   const k8sClient = kc.makeApiClient(k8s.CustomObjectsApi);
  //   const obj = await k8sClient.listClusterCustomObject(
  //     "app.undistro.io",
  //     "v1alpha1",
  //     "clusters"
  //   );
  //   const k8sObj = obj.body as k8s.KubernetesListObject<any>;
    // clusters = k8sObj.items.map((cl, index) => {
    //   let machines = 0;
    //   let workers = cl.spec.workers as Array<any>;
    //   workers.forEach((w) => {
    //     machines += w.replicas as number;
    //   });
    //   let conditions = cl.status.conditions as Array<k8s.V1Condition>;
    //   if (
    //     cl.spec.controlPlane != undefined &&
    //     cl.spec.controlPlane.replicas != undefined
    //   ) {
    //     machines += cl.spec.controlPlane.replicas as number;
    //   }
    //   return {
    //     name: cl.metadata.name as string,
    //     provider: cl.spec.infrastructureProvider.name as string,
    //     flavor: cl.spec.infrastructureProvider.flavor as string,
    //     k8sVersion: cl.spec.kubernetesVersion as string,
    //     clusterGroup: cl.metadata.namespace as string,
    //     machines: machines,
    //     age: getAge(cl.metadata.creationTimestamp as string),
    //     status: getStatusFromConditions(conditions),
    //   };
    // });
  // }
  return {
    props: {
      clusters: clusters,
      selectedClusters: selectedClusters,
      page: pageVar
    }
  }
}

const Home: NextPage = (props: Props) => {
  return (
    <Workspace selectedClusters={props.selectedClusters || []}>
      <ClustersOverview clusters={props.clusters} page={props.page!} />
    </Workspace>
  )
}

export default Home
