import * as React from "react";
import classes from "./clustersOverview.module.css";
import Clustersoverviewrow from "./clustersOverviewRow";
import Clustersoverviewnavfooter from "./clustersOverviewNavFooter";
import { Cluster } from "../../lib/cluster";
import { useEffect, useState } from "react";

type Props = {
  selectCluster: (cluster: string, checked: boolean) => void;
  clusters?: Cluster[];
};

const Clustersoverview = (props: Props) => {
  const [count, setCount] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const changeCheckbox = () => {
    setChecked(!checked);
    if (!checked) {
      setCount(0);
    }
  };
  useEffect(() => {
    if (count == props.clusters?.length) {
      setChecked(true);
    }
  }, [count]);
  const updateTable = (checked: boolean) => {
    if (props.clusters) {
      if (checked) {
        setCount(count + 1);
      } else {
        setCount(count - 1);
      }
    }
  };
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
                      <input
                        className={classes.tableCheckboxAll}
                        onChange={() => changeCheckbox()}
                        type="checkbox"
                        name="checkbox"
                        checked={checked}
                      />
                    </label>
                  </div>
                </th>
                <th>
                  <div className={classes.tableIconCol}>
                    <div className={classes.actionsIconAllDisabled}></div>
                  </div>
                </th>
                <th className={classes.responsiveTh}>
                  <div className={classes.tableHeaderTitle}>clusters</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>provider</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>flavor</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>k8s version</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>cluster group</div>
                </th>
                <th>
                  <div className={classes.tableHeaderTitle}>machines</div>
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
              {props.clusters?.map((r, index) => {
                return (
                  <Clustersoverviewrow
                    key={index + 1}
                    cluster={r}
                    selectCluster={props.selectCluster}
                    checkedAll={checked}
                    updateTable={updateTable}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        <Clustersoverviewnavfooter />
      </div>
    </>
  );
};

export default Clustersoverview;
