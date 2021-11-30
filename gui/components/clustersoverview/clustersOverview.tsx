import { useRouter } from "next/router";
import * as React from "react";
import { createRef, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { Cluster, empty } from "../../lib/cluster";
import { paginate } from "../../lib/pagination";
import Page404message from "../page404/page404message";
import { useClusters } from "../workspace/clusterctx";
import classes from "./clustersOverview.module.css";
import Clustersoverviewemptyrow from "./clustersOverviewEmptyRow";
import { Clusteroverviewfooter } from "./clustersOverviewNavFooter";
import Clustersoverviewrow from "./clustersOverviewRow";

type Props = {
  clusters?: Cluster[];
  page: string;
};

const Clustersoverview = (props: Props) => {
  const rowHeight = 36;
  const router = useRouter();
  const tableContainerRef = createRef<HTMLDivElement>();
  const tableRef = createRef<HTMLTableElement>() || undefined;
  const pageFooterRef = createRef<HTMLDivElement>();
  const { clusters, setClusters } = useClusters();
  const [clustersList, setClustersList] = useState<Cluster[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const { height } = useResizeDetector<HTMLDivElement>({
    targetRef: tableContainerRef,
  });
  const [qtyPages, setQtyPages] = useState<number>(1);
  const [isValidPage, setValidPage] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(0);
  const [initialContainerSize, setInitialContainerSize] = useState<number>(0);
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
      if (initialContainerSize == 0) {
        setInitialContainerSize(height!);
        return;
      }
      if (initialContainerSize > 0) {
        pagesCalc();
      }
    }
  }, [clusters, height, initialContainerSize, qtyPages, isValidPage]);
  let pageNumber = parseInt(props.page);
  const pagesCalc = () => {
    let pageFooter = pageFooterRef?.current;
    let pageFooterHeight = pageFooter?.getBoundingClientRect().height;
    let pageQtyItems = Math.trunc((height! - pageFooterHeight!) / rowHeight);
    pageQtyItems = pageQtyItems - 1; // ignore table header
    setPageSize(pageQtyItems);

    if (pageQtyItems > 0) {
      let qtyPages = Math.ceil(props.clusters?.length! / pageQtyItems);
      setQtyPages(qtyPages);
    }
    if (qtyPages && pageNumber > qtyPages) {
      console.log("if");
      console.log(pageNumber);
      console.log(qtyPages);
      setValidPage(false);
    } else {
      console.log("else");
      console.log(pageNumber);
      console.log(qtyPages);
      setValidPage(true);
    }
    let pageLists = paginate(props.clusters!, pageQtyItems);
    if (pageLists.length >= pageNumber) {
      let items = pageLists[pageNumber - 1];
      setClustersList(items);
      if (items.length < pageQtyItems) {
        let emptyRows = pageQtyItems - items.length;
        for (let i = 0; i < emptyRows; i++) {
          items.push(empty);
        }
      }
    }
  };
  if (isValidPage) {
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
                    <div className={classes.tableHeaderTitle}>
                      cluster group
                    </div>
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
                {clustersList?.map((r, index) => {
                  if (r.name != "") {
                    return (
                      <Clustersoverviewrow
                        key={index + 1}
                        cluster={r}
                        disabled={false}
                      />
                    );
                  } else {
                    return <Clustersoverviewemptyrow key={index + 1} />;
                  }
                })}
              </tbody>
            </table>
            <Clusteroverviewfooter
              ref={pageFooterRef}
              total={props.clusters?.length || 0}
              currentPage={pageNumber}
              qtdPages={qtyPages}
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Page404message />
      </>
    );
  }
};

export default Clustersoverview;
