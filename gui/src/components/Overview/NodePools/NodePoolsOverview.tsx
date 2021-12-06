import classes from './NodepoolsOverview.module.css'
import NodePoolOverviewInfranodeRow from './NodePoolsOverviewInfranodeRow'
import NodepoolOverviewNavFooter from './NodePoolsOverviewNavFooter'

type Props = {}

const Nodepoolsoverview = (props: Props) => {
  {
    /*let tableCellTitleCentered = [classes.tableCellTitle, "textCentered"].join(" ");
    let tableCellTitleUpperCase = [classes.tableCellTitle, "upperCase"].join(" ");
    let tableCellTitleWarningCentered = [classes.tableCellTitleWarning, "textCentered"].join(" ");
    let tableCellTitleSuccessCentered = [classes.tableCellTitleSuccess, "textCentered"].join(" ");*/
  }
  return (
    <>
      <div className={classes.clustersOverviewContainer}>
        <div className={classes.clustersOverviewTableContainer}>
          <table className={classes.clustersOverviewTable}>
            <thead>
              <tr>
                <th>
                  <div className={classes.tableCheckboxAllIconContainer}>
                    <label className={classes.tableCheckboxControlAll}>
                      <input className={classes.tableCheckboxAll} type="checkbox" name="checkbox" />
                    </label>
                  </div>
                </th>
                <th>
                  <div className={classes.tableIconCol}>
                    <div className={classes.actionsIconAllDisabled}></div>
                  </div>
                </th>
                <th className={classes.responsiveTh}>
                  <div className={classes.tableHeaderTitle}>nodepool</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>type</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>replicas</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>k8s version</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>labels</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>taints</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>age</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>status</div>
                </th>
              </tr>
            </thead>

            <tbody>
              <NodePoolOverviewInfranodeRow />
            </tbody>
          </table>
        </div>

        <NodepoolOverviewNavFooter />
      </div>
    </>
  )
}

export default Nodepoolsoverview
