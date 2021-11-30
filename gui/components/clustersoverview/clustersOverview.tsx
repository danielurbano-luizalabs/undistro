import * as React from "react";
import classes from "./clustersOverview.module.css";
import Clustersoverviewrow from "./clustersOverviewRow";
import { Clusteroverviewfooter } from "./clustersOverviewNavFooter";
import { Cluster } from "../../lib/cluster";
import { createRef, useEffect, useState } from "react";
import { useClusters } from "../workspace/clusterctx";
import { useResizeDetector } from "react-resize-detector";

type Props = {
  clusters?: Cluster[];
  page: string;
};

const Clustersoverview = (props: Props) => {
  const rowHeight = 36;
  const columns = 10;
  const tableContainerRef = createRef<HTMLDivElement>();
  const tableRef = createRef<HTMLTableElement>() || undefined;
  const pageFooterRef = createRef<HTMLDivElement>();
  const { clusters, setClusters } = useClusters();
  const [checked, setChecked] = useState<boolean>(false);
  const [currentExtraRows, setCurrentExtraRows] = useState<number>(0);
  const { height } = useResizeDetector<HTMLDivElement>({
    targetRef: tableContainerRef,
  });
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
    if (height) {
      distanceCalc();
    }
  }, [clusters, height]);
  let pageNumber = parseInt(props.page);
  const distanceCalc = () => {
    let table = tableRef?.current;
    if (currentExtraRows > 0) {
      let r = currentExtraRows;
      let tableLength = table?.rows.length;
      while (r > 0) {
        table?.deleteRow(tableLength! - 1);
        tableLength!--;
        r--;
      }
    }
    let pageFooter = pageFooterRef?.current;
    let tableContainer = tableContainerRef?.current;
    let tableHeight = table?.getBoundingClientRect().height;
    let pageFooterHeight = pageFooter?.getBoundingClientRect().height;
    let tableContainerHeight = tableContainer?.getBoundingClientRect().height;
    if (height) {
      tableContainerHeight = height;
    }
    let diff = tableContainerHeight! - (tableHeight! + pageFooterHeight!);
    let rows = Math.trunc(diff / rowHeight);
    if (tableHeight! > 0) {
      for (let i = 0; i < rows; i++) {
        let row = table?.insertRow(-1);
        for (let j = 0; j < columns; j++) {
          row?.insertCell(j);
        }
      }
      setCurrentExtraRows(rows);
    }
  };

  return (
    <>
      <div className={classes.clustersOverviewContainer}>
        <div
          id="tableContainer"
          className={classes.clustersOverviewTableContainer}
          ref={tableContainerRef}
        >
          <table
            ref={tableRef}
            id="table"
            className={classes.clustersOverviewTable}
          >
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
                  ></Clustersoverviewrow>
                  
                );
              })}
            </tbody>
          </table>
          <Clusteroverviewfooter
            ref={pageFooterRef}
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
