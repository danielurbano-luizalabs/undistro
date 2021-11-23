import * as React from "react";
import classes from "./clustersOverviewRow.module.css";

type Props = {
  selectCluster: (cluster: string) => void;
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
  let tableCellTitleWarningCentered = [
    classes.tableCellTitleWarning,
    "textCentered",
  ].join(" ");
  return (
    <>
      <tr>
        <td>
          <div className={classes.tableCheckboxIconContainer}>
            <label className={classes.tableCheckboxControl}>
              <input
                onChange={() => props.selectCluster("teste")}
                className={classes.tableCheckbox}
                type="checkbox"
                name="checkbox"
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
          <div className={classes.tableCellTitle}>ztk-supzema-staging-02</div>
        </td>
        <td>
          <div className={classes.tableCellTitle}>google cloud</div>
        </td>
        <td>
          <div className={tableCellTitleUpperCaseCentered}>gke</div>
        </td>
        <td>
          <div className={classes.tableCellTitle}>v.1.17.7</div>
        </td>
        <td>
          <div className={classes.tableCellTitle}>Staging</div>
        </td>
        <td>
          <div className={tableCellTitleCentered}>4</div>
        </td>
        <td>
          <div className={tableCellTitleCentered}>2d21h</div>
        </td>
        <td>
          <div className={tableCellTitleWarningCentered}>paused</div>
        </td>
      </tr>
    </>
  );
};

export default Clustersoverviewrow;
