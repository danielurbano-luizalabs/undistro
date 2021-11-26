import * as React from "react";
import classes from "./clustersOverview.module.css";
import Clustersoverviewrow from "./clustersOverviewRow";
import Clustersoverviewnavfooter from "./clustersOverviewNavFooter";
import { Cluster } from "../../lib/cluster";
import { useEffect, useState } from "react";
import { useClusters } from "../workspace/clusterctx";

type Props = {
  clusters?: Cluster[];
};

const Clustersoverview = (props: Props) => {
  const { clusters, setClusters } = useClusters();
  const [checked, setChecked] = useState<boolean>(false);
  const changeCheckbox = (checked: boolean) => {
    if (checked) {
      let cls: string[] = [];
      props.clusters?.forEach((c) => {
        cls.push(c.name);
      });
      setClusters(cls);
    } else {
      setClusters([]);
      setChecked(false);
    }
  };
  useEffect(() => {
    if (clusters?.length == props.clusters?.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [clusters]);
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
                        onChange={(e) => changeCheckbox(e.target.checked)}
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
                return <Clustersoverviewrow key={index + 1} cluster={r} />;
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
