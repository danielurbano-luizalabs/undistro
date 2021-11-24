import * as React from "react";
import { useEffect, useState } from "react";
import { Cluster } from "../../lib/cluster";
import classes from "./clustersOverviewRow.module.css";

type Props = {
  selectCluster: (cluster: string, checked: boolean) => void;
  updateTable: (checked: boolean) => void;
  cluster: Cluster;
  key: number;
  checkedAll: boolean;
};

const Clustersoverviewrow = (props: Props) => {
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
  const [checked, setChecked] = useState<boolean>(props.checkedAll);
  useEffect(() => {
    props.selectCluster(props.cluster.name, props.checkedAll);
    setChecked(props.checkedAll);
  }, [props.checkedAll]);
  const selectFn = (name: string) => {
    props.updateTable(!checked);
    props.selectCluster(name, !checked);
    setChecked(!checked);
  };
  return (
    <>
      <tr>
        <td>
          <div className={classes.tableCheckboxIconContainer}>
            <label className={classes.tableCheckboxControl}>
              <input
                onChange={() => selectFn(props.cluster.name)}
                className={classes.tableCheckbox}
                type="checkbox"
                name="checkbox"
                checked={checked}
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
          <div className={tableCellTitleCentered}>{props.cluster.machines}</div>
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

export default Clustersoverviewrow;
