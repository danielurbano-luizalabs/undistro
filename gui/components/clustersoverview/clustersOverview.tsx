import * as React from "react";
import classes from "./clustersOverview.module.css";
import Clustersoverviewrow from "./clustersOverviewRow";
import Clustersoverviewnavfooter from "./clustersOverviewNavFooter";
import Link from "next/link";

type Props = {};

const Clustersoverview = (props: Props) => {
    let tableCellTitleCentered = [classes.tableCellTitle, "textCentered"].join(" ");
    let tableCellTitleUpperCase = [classes.tableCellTitle, "upperCase"].join(" ");
    let tableCellTitleWarningCentered = [classes.tableCellTitleWarning, "textCentered"].join(" ");
    let tableCellTitleSuccessCentered = [classes.tableCellTitleSuccess, "textCentered"].join(" ");
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
                                    <div className={classes.tableHeaderTitle}>
                                        clusters
                                    </div>
                                </th>
                                <th>
                                    <div className={classes.tableHeaderTitle}>
                                        provider
                                    </div>
                                </th>
                                <th>
                                    <div className={classes.tableHeaderTitle}>
                                        flavor
                                    </div>
                                </th>
                                <th>
                                    <div className={classes.tableHeaderTitle}>
                                        k8s version
                                    </div>
                                </th>
                                <th>
                                    <div className={classes.tableHeaderTitle}>
                                        cluster group
                                    </div>
                                </th>
                                <th>
                                    <div className={classes.tableHeaderTitle}>
                                        machines
                                    </div>
                                </th>
                                <th>
                                    <div className={classes.tableHeaderTitle}>
                                        age
                                    </div>
                                </th>
                                <th>
                                    <div className={classes.tableHeaderTitle}>
                                        status
                                    </div>
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                        <Clustersoverviewrow />

                        </tbody>

                    </table>

                </div>

                <Clustersoverviewnavfooter />

            </div>




        </>
    );
}

export default Clustersoverview;