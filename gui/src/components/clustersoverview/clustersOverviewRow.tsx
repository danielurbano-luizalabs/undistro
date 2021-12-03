import * as React from "react";
import { Cluster } from "../../lib/cluster";
import { useClusters } from "../workspace/clusterctx";
import classes from "./clustersOverviewRow.module.css";

type Props = {
  cluster: Cluster;
  key: number;
  disabled: boolean;
};

const ClustersOverviewRow = (props: Props) => {
  const { clusters, setClusters } = useClusters();

  let tableCellTitleCentered = [classes.tableCellTitle, "textCentered"].join(
    " "
  );
  let tableCellTitleUpperCaseCentered = [
    classes.tableCellTitle,
    "upperCase",
    "textCentered",
  ].join(" ");
  let tableCellTitleUpperCase = [classes.tableCellTitle, "upperCase"].join(" ");
  let tableCellTitleWarningCentered = [
    classes.tableCellTitleWarning,
    "textCentered",
  ].join(" ");
  let tableCellTitleCriticalCentered = [
    classes.tableCellTitleWarning,
    "textCentered",
  ].join(" ");
  let tableCellTitleSuccessCentered = [
    classes.tableCellTitleSuccess,
    "textCentered",
  ].join(" ");
  let statusClass = tableCellTitleCriticalCentered;
  if (props.cluster.status.toLowerCase() == "ready") {
    statusClass = tableCellTitleSuccessCentered;
  } else if (
    props.cluster.status.toLowerCase() == "provisioning" ||
    props.cluster.status.toLowerCase() == "paused" ||
    props.cluster.status.toLowerCase() == "deleting"
  ) {
    statusClass = tableCellTitleWarningCentered;
  }
  const changeCheckbox = (name: string, checked: boolean) => {
    let cls = new Set<string>(clusters);
    if (checked) {
      cls.add(name);
    } else if (cls.has(name)) {
      cls.delete(name);
    }
    setClusters(Array.from(cls.values()));
  };
  let machineStr = "";
  if (!props.disabled) {
    machineStr = props.cluster.machines.toString();
  }
  return (
    <>
      <tr>
        <td>
          <div className={classes.tableCheckboxIconContainer}>
            <label className={classes.tableCheckboxControl}>
              <input
                className={classes.tableCheckbox}
                onChange={(e) =>
                  changeCheckbox(props.cluster.name, e.target.checked)
                }
                type="checkbox"
                name="checkbox"
                checked={clusters.includes(props.cluster.name)}
                disabled={props.disabled}
              />
            </label>
          </div>
        </td>
        <td>
          <div className={classes.tableActionsIconContainer}>
            <div className={classes.actionsIcon}></div>
          </div>
        </td>
        <td>
          <div className={classes.tableCellTitle}>{props.cluster.name}</div>
        </td>
        <td>
          <div className={tableCellTitleUpperCase}>
            {props.cluster.provider}
          </div>
        </td>
        <td>
          <div className={tableCellTitleUpperCaseCentered}>
            {props.cluster.flavor}
          </div>
        </td>
        <td>
          <div className={classes.tableCellTitle}>
            {props.cluster.k8sVersion}
          </div>
        </td>
        <td>
          <div className={classes.tableCellTitle}>
            {props.cluster.clusterGroup}
          </div>
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
  );
};

export default ClustersOverviewRow;
