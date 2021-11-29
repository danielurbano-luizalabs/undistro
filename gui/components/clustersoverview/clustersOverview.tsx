import * as React from "react";
import classes from "./clustersOverview.module.css";
import Clustersoverviewrow from "./clustersOverviewRow";
import Clustersoverviewnavfooter from "./clustersOverviewNavFooter";
import { Cluster } from "../../lib/cluster";
import { useEffect, useState } from "react";
import { useClusters } from "../workspace/clusterctx";

type Props = {
  clusters?: Cluster[];
  page: string;
};

const Clustersoverview = (props: Props) => {
  const rowHeight = 36;
  const columns = 10;
  const { clusters, setClusters } = useClusters();
  const [checked, setChecked] = useState<boolean>(false);
  const [qtdPages, setQtdPages] = useState<number>(1);
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
    distanceCalc();
  }, [clusters]);
  let pageNumber = parseInt(props.page);
  const distanceCalc = () => {
    let table = document.getElementById("table") as HTMLTableElement;
    let pageFooter = document.getElementById("pageFooter");
    let tableTop = table?.offsetTop;
    let pageFooterTop = pageFooter?.offsetTop;
    let height = table?.offsetHeight - pageFooter?.offsetHeight!;
    let diff = pageFooterTop! - tableTop!;
    diff = diff - height;
    let pageSize = Math.trunc(diff / rowHeight);
    let pages = Math.ceil(props.clusters?.length! / pageSize);
    if (pages > 0) {
      setQtdPages(pages);
    }
    let rows =
      Math.trunc(diff / rowHeight) - Math.trunc(props.clusters!.length);
    rows = rows + 1; // plus header row
    for (let index = 0; index < rows; index++) {
      let row = table.insertRow(-1); // append
      for (let index = 0; index < columns; index++) {
        row.insertCell(index);
      }
    }
  };
  return (
    <>
      <div className={classes.clustersOverviewContainer}>
        <div className={classes.clustersOverviewTableContainer}>
          <table id="table" className={classes.clustersOverviewTable}>
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
                return (
                  <Clustersoverviewrow
                    key={index + 1}
                    cluster={r}
                    disabled={false}
                  />
                );
              })}
            </tbody>
          </table>
          <Clustersoverviewnavfooter
            total={props.clusters?.length || 0}
            currentPage={pageNumber}
            qtdPages={qtdPages}
          />
        </div>
      </div>
    </>
  );
};

export default Clustersoverview;
