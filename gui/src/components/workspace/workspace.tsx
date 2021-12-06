import { useState } from 'react'
import Topbar from '../topbararea/topbar'
import Workarea from '../workarea/Workarea'
import { ClusterContext } from '@/contexts/ClusterContext'

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
