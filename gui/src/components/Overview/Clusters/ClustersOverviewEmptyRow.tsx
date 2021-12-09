import classNames from 'classnames'

import styles from './ClustersOverviewRow.module.css'

type Props = {
  key: number
}

const ClustersOverviewEmptyRow = (props: Props) => {
  let tableCellTitleCentered = classNames(styles.tableCellTitle, 'textCentered')
  let tableCellTitleUpperCaseCentered = classNames(styles.tableCellTitle, 'upperCase', 'textCentered')
  let tableCellTitleUpperCase = classNames(styles.tableCellTitle, 'upperCase')
  let tableCellTitleCriticalCentered = classNames(styles.tableCellTitleWarning, 'textCentered')
  let statusClass = tableCellTitleCriticalCentered

  return (
    <tr {...props}>
      <td>
        <div className={styles.tableCheckboxIconContainer}>
          <label className={styles.tableCheckboxControl}></label>
        </div>
      </td>
      <td>
        <div className={styles.tableActionsIconContainer}></div>
      </td>
      <td>
        <div className={styles.tableCellTitle}></div>
      </td>
      <td>
        <div className={tableCellTitleUpperCase}></div>
      </td>
      <td>
        <div className={tableCellTitleUpperCaseCentered}></div>
      </td>
      <td>
        <div className={styles.tableCellTitle}></div>
      </td>
      <td>
        <div className={styles.tableCellTitle}></div>
      </td>
      <td>
        <div className={tableCellTitleCentered}></div>
      </td>
      <td>
        <div className={tableCellTitleCentered}></div>
      </td>
      <td>
        <div className={statusClass}></div>
      </td>
    </tr>
  )
}

export default ClustersOverviewEmptyRow
