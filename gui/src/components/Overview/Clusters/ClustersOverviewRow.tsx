import classNames from 'classnames'

import { Cluster } from '@/lib/cluster'
import { useClusters } from '@/contexts/ClusterContext'

import styles from './ClustersOverviewRow.module.css'

type Props = {
  cluster: Cluster
  key: number
  disabled: boolean
}

const ClustersOverviewRow = (props: Props) => {
  const { clusters, setClusters } = useClusters()

  let tableCellTitleCentered = classNames(styles.tableCellTitle, 'textCentered')
  let tableCellTitleUpperCase = classNames(styles.tableCellTitle, 'upperCase')
  let tableCellTitleUpperCaseCentered = classNames(styles.tableCellTitle, 'upperCase', 'textCentered')
  let tableCellTitleWarningCentered = classNames(styles.tableCellTitleWarning, 'textCentered')
  let tableCellTitleCriticalCentered = classNames(styles.tableCellTitleWarning, 'textCentered')
  let tableCellTitleSuccessCentered = classNames(styles.tableCellTitleSuccess, 'textCentered')
  let statusClass = tableCellTitleCriticalCentered

  if (props.cluster.status.toLowerCase() == 'ready') {
    statusClass = tableCellTitleSuccessCentered
  } else if (
    props.cluster.status.toLowerCase() == 'provisioning' ||
    props.cluster.status.toLowerCase() == 'paused' ||
    props.cluster.status.toLowerCase() == 'deleting'
  ) {
    statusClass = tableCellTitleWarningCentered
  }

  const changeCheckbox = (name: string, checked: boolean) => {
    let cls = new Set<string>(clusters)
    if (checked) {
      cls.add(name)
    } else if (cls.has(name)) {
      cls.delete(name)
    }
    setClusters(Array.from(cls.values()))
  }

  let machineStr = ''
  if (!props.disabled) {
    machineStr = props.cluster.machines.toString()
  }

  return (
    <>
      <tr>
        <td>
          <div className={styles.tableCheckboxIconContainer}>
            <label className={styles.tableCheckboxControl}>
              <input
                className={styles.tableCheckbox}
                onChange={e => changeCheckbox(props.cluster.name, e.target.checked)}
                type="checkbox"
                name="checkbox"
                checked={clusters.includes(props.cluster.name)}
                disabled={props.disabled}
              />
            </label>
          </div>
        </td>
        <td>
          <div className={styles.tableActionsIconContainer}>
            <div className={styles.actionsIcon}></div>
          </div>
        </td>
        <td>
          <div className={styles.tableCellTitle}>{props.cluster.name}</div>
        </td>
        <td>
          <div className={tableCellTitleUpperCase}>{props.cluster.provider}</div>
        </td>
        <td>
          <div className={tableCellTitleUpperCaseCentered}>{props.cluster.flavor}</div>
        </td>
        <td>
          <div className={styles.tableCellTitle}>{props.cluster.k8sVersion}</div>
        </td>
        <td>
          <div className={styles.tableCellTitle}>{props.cluster.clusterGroup}</div>
        </td>
        <td>
          <div className={tableCellTitleCentered}>{machineStr}</div>
        </td>
        <td>
          <div className={tableCellTitleCentered}>{props.cluster.age}</div>
        </td>
        <td>
          <div className={statusClass}>{props.cluster.status}</div>
        </td>
      </tr>
    </>
  )
}

export default ClustersOverviewRow
