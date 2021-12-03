import * as React from 'react'
import { useState } from 'react'
import Topbar from '../topbararea/topbar'
import Workarea from '../Workarea/Workarea'
import { ClusterContext } from './clusterctx'

type Props = {
  children?: React.ReactNode
  selectedClusters: string[]
}

const Workspace = (props: Props) => {
  const [clusters, setClusters] = useState<string[]>(props.selectedClusters)
  return (
    <>
      <ClusterContext.Provider value={{ clusters, setClusters }}>
        <Topbar />
        <Workarea>{props.children}</Workarea>
      </ClusterContext.Provider>
    </>
  )
}

export default Workspace
