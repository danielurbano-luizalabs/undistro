import * as React from "react";
import classes from "./clustersOverviewRow.module.css";

type Props = {
  key: number;
};

const Clustersoverviewemptyrow = (props: Props) => {
  let tableCellTitleCentered = [classes.tableCellTitle, "textCentered"].join(
    " "
  );
  let tableCellTitleUpperCaseCentered = [
    classes.tableCellTitle,
    "upperCase",
    "textCentered",
  ].join(" ");
  let tableCellTitleUpperCase = [classes.tableCellTitle, "upperCase"].join(" ");
  let tableCellTitleCriticalCentered = [
    classes.tableCellTitleWarning,
    "textCentered",
  ].join(" ");
  let statusClass = tableCellTitleCriticalCentered;
  return (
    <>
      <tr>
        <td>
          <div className={classes.tableCheckboxIconContainer}>
            <label className={classes.tableCheckboxControl}></label>
          </div>
        </td>
        <td>
          <div className={classes.tableActionsIconContainer}></div>
        </td>
        <td>
          <div className={classes.tableCellTitle}></div>
        </td>
        <td>
          <div className={tableCellTitleUpperCase}></div>
        </td>
        <td>
          <div className={tableCellTitleUpperCaseCentered}></div>
        </td>
        <td>
          <div className={classes.tableCellTitle}></div>
        </td>
        <td>
          <div className={classes.tableCellTitle}></div>
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
    </>
  );
};

export default Clustersoverviewemptyrow;
