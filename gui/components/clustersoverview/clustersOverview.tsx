import { useRouter } from "next/router";
import * as React from "react";
import { createRef, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { Cluster, empty } from "../../lib/cluster";
import { paginate } from "../../lib/pagination";
import Page404message from "../page404/page404message";
import { useClusters } from "../workspace/clusterctx";
import classes from "./clustersOverview.module.css";
import ClustersOverviewEmptyRow from "./clustersOverviewEmptyRow";
import { ClusterOverviewFooter } from "./clustersOverviewNavFooter";
import ClustersOverviewRow from "./clustersOverviewRow";

type Props = {
  clusters?: Cluster[];
  page: string;
};

const ClustersOverview = (props: Props) => {
  const rowHeight = 36;
  const router = useRouter();
  const tableContainerRef = createRef<HTMLDivElement>();
  const tableRef = createRef<HTMLTableElement>() || undefined;
  const pageFooterRef = createRef<HTMLDivElement>();
  const { clusters: selectedClusters, setClusters: setSelectedClusters } = useClusters();
  const [clustersList, setClustersList] = useState<Cluster[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const { height } = useResizeDetector<HTMLDivElement>({
    targetRef: tableContainerRef,
  });
  const [qtyPages, setQtyPages] = useState<number>(1);
  const [isValidPage, setValidPage] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(0);
  const [initialContainerSize, setInitialContainerSize] = useState<number>(0);

  const columns = [
    'provider', 'flavor',
    'k8s version', 'cluster group',
    'machines', 'age', 'status',
  ]

  const changeCheckbox = (checked: boolean) => {
    if (checked) {
      let cls: string[] = [];
      clustersList?.forEach((c) => {
        cls.push(c.name);
      });
      setSelectedClusters(cls);
    } else {
      setSelectedClusters([]);
      setAllChecked(false);
    }
  };

  let pageNumber = parseInt(props.page);
  const pagesCalc = () => {
    let pageFooter = pageFooterRef?.current;
    let pageFooterHeight = pageFooter?.getBoundingClientRect().height;
    if (pageFooterHeight === NaN) {
      pageFooterHeight = 44;
    }
    let pageQtyItems = Math.trunc((height! - pageFooterHeight!) / rowHeight);
    pageQtyItems = pageQtyItems - 1; // ignore table header
    setPageSize(pageQtyItems);

    if (pageQtyItems > 0) {
      let qtyPages = Math.ceil(props.clusters?.length! / pageQtyItems);
      setQtyPages(qtyPages);
    }
    let pageLists = paginate(props.clusters!, pageQtyItems);
    if (pageLists.length >= pageNumber) {
      let items = pageLists[pageNumber - 1];
      setClustersList(items);
    }
  };

  useEffect(() => {
    if (qtyPages && pageNumber > qtyPages) {
      setValidPage(false);
    } else {
      setValidPage(true);
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
  }, [height, initialContainerSize, isValidPage, qtyPages, router]);

  useEffect(() => {
    pagesCalc();
    setSelectedClusters([])
  }, [pageNumber])

  useEffect(() => {
    let displayedClusters = clustersList.filter(e => e.name != '')
    setAllChecked(selectedClusters?.length == displayedClusters?.length)
  }, [clustersList, selectedClusters])

  const renderClusters = () => {
    let clusters = []

    for (let i = 0; i < (clustersList.length + (pageSize - clustersList.length)); i++) {
      if (clustersList[i] === undefined) {
        clusters.push(<ClustersOverviewEmptyRow key={i} />);
      } else {
        clusters.push(<ClustersOverviewRow key={i} cluster={clustersList[i]} disabled={false} />);
      }
    }
    return clusters;
  };

  return (
    <>
      <div className={classes.clustersOverviewContainer}>
        <div
          id="tableContainer"
          className={classes.clustersOverviewTableContainer}
          ref={tableContainerRef}
        >
          {isValidPage ?
            <>
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
                            checked={allChecked}
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
                      <div className={classes.tableHeaderTitle}>
                        clusters
                      </div>
                    </th>
                    {columns.map((column, i) => (
                      <th key={i}>
                        <div className={classes.tableHeaderTitle}>{column}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {renderClusters()}
                </tbody>
              </table>
              <ClusterOverviewFooter
                ref={pageFooterRef}
                total={props.clusters?.length || 0}
                currentPage={pageNumber}
                qtdPages={qtyPages}
              />
            </> : <Page404message />}
        </div>
      </div>
    </>
  );
};

export default ClustersOverview;
