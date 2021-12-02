import * as React from "react";
import classes from "./clustersOverviewNavFooter.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "./Pagination";

type Props = {
  total: number;
  currentPage: number;
  pageSize: number;
  qtdPages: number;
  refer?: React.ForwardedRef<HTMLDivElement>;
};

export const ClusterOverviewFooter = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <ClustersOverviewNavFooter
        total={props.total || 0}
        currentPage={props.currentPage}
        qtdPages={props.qtdPages}
        pageSize={props.pageSize}
        refer={ref}
      />
    );
  }
);

const ClustersOverviewNavFooter = (props: Props) => {
  const router = useRouter();

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let el = e.target as HTMLInputElement;
    router.query.page = el.value;
    if (e.key == "Enter" && parseInt(el.value) != props.currentPage) {
      if (parseInt(el.value) <= props.qtdPages) {
        router.push({
          query: { page: el.value },
        });
      }
    }
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let el = e.target as HTMLInputElement;
    if (
      parseInt(el.value) <= props.qtdPages &&
      parseInt(el.value) != props.currentPage
    ) {
      router.push({
        query: { page: el.value },
      });
    }
  };
  return (
    <>
      <div
        ref={props.refer}
        id="pageFooter"
        className={classes.tableFooterContainer}
      >
        <div className={classes.tableFooter}>
          <div className={classes.navFooterResults}>
            <a className={classes.navFooterResultsText}>
              {props.total} Results
            </a>
          </div>
          {/* {props.qtdPages > 1 ? ( */}
          <>
            <div className={classes.navFooterJumpToPage}>
              <a className={classes.navFooterJumpToPageText}>Jump to page</a>
            </div>

            <div className={classes.paginationSearchArea}>
              <input
                onKeyPress={(e) => pressEnter(e)}
                onBlur={(e) => onBlur(e)}
                className={classes.paginationSearchBox}
                placeholder={props.currentPage.toString()}
                type="text"
              ></input>
            </div>
            <Pagination
              currentPage={props.currentPage}
              totalCount={props.total}
              pageSize={props.pageSize}
              onPageChange={page => console.log(page)}
            />
          </>
          {/* ) : null} */}
        </div>
      </div>
    </>
  );
};

export default ClustersOverviewNavFooter;
