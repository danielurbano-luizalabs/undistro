/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from '@components/layout'
import { WorkerDetails } from '@components/details'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useServices } from 'providers/ServicesProvider'

export default function WorkerPage() {
  const { Api } = useServices()
  const [groups, setGroups] = useState<any>()
  const history = useHistory()

  const getData = () => {
    Api.Cluster.get('undistro-system', 'wizard').then(elm => {
      const clusterName = elm.metadata.name
      setGroups(
        elm.spec.workers.map((elm: any, i = 0) => {
          return {
            infraNode: elm.infraNode,
            maxSize: elm.autoscaling.maxSize,
            minSize: elm.autoscaling.minSize,
            name: `${clusterName}-${i}`,
            workerMachineType: elm.machineType,
            workerReplicas: elm.replicas,
            workerSubnet: elm.subnet
          }
        })
      )
    })
  }
  useEffect(() => {
    getData()
  }, [])

  return groups ? (
    <Layout>
      <div className="home-page-route">
        <WorkerDetails
          groups={groups}
          onCancel={() => history.push('/')}
          onSave={data => {
            console.log(data)
          }}
        />
      </div>
    </Layout>
  ) : null
}
