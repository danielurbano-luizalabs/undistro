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
  const { query } = context

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

  return {
    props: {
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
