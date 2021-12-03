import * as React from "react";
import classes from "./nodepoolsOverviewInfranodeRow.module.css";
import Link from "next/link";

type Props = {};

const Nodepooloverviewinfranoderow = (props: Props) => {
    let tableCellTitleCentered = [classes.tableCellTitle, "textCentered"].join(" ");
    let tableCellTitleUpperCaseCentered = [classes.tableCellTitle, "upperCase", "textCentered"].join(" ");
    let tableCellTitleWarningCentered = [classes.tableCellTitleWarning, "textCentered"].join(" ");
    let tableCellTitleSuccessCentered = [classes.tableCellTitleSuccess, "textCentered"].join(" ");
    let tableCellTitleCriticalCentered = [classes.tableCellTitleCritical, "textCentered"].join(" ");
    return (
        <>

            <tr>
                <td>
                    <div className={classes.tableCheckboxIconContainer}>
                        <label className={classes.tableCheckboxControl}>
                        <input className={classes.tableCheckbox} type="checkbox" name="checkbox" />
                        </label>
                    </div>
                </td>
                <td>
                    <div className={classes.tableActionsIconContainer}>
                        <div className={classes.actionsIcon}></div>
                    </div>
                </td>
                <td>
                    <div className={classes.tableCellTitle}>
                        nodepool-01
                    </div>
                </td>
                <td>
                    <div className={classes.tableCellTitle}>
                        infranode
                    </div>
                </td>
                <td>
                    <div className={tableCellTitleCentered}>
                        3
                    </div>
                </td>
                <td>
                    <div className={classes.tableCellTitle}>
                        v.1.17.7
                    </div>
                </td>
                <td>
                    <div className={tableCellTitleCentered}>
                        1
                    </div>
                </td>
                <td>
                    <div className={tableCellTitleCentered}>
                        2
                    </div>
                </td>
                <td>
                    <div className={tableCellTitleCentered}>
                        2d21h
                    </div>
                </td>
                <td>
                    <div className={tableCellTitleWarningCentered}>
                        paused
                    </div>
                </td>
            </tr>

        </>
    );
}

export default Nodepooloverviewinfranoderow;