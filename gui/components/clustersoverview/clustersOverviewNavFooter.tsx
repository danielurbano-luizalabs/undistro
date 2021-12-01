import * as React from "react";
import classes from "./clustersOverviewNavFooter.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  total: number;
  currentPage: number;
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

            <div className={classes.paginationNavContainer}>
              {props.currentPage > 1 ? (
                <Link href={`/?page=${props.currentPage - 1}`}>
                  <a>
                    <div className={classes.paginationNavArrowLeft}></div>
                  </a>
                </Link>
              ) : (
                <a>
                  <div className={classes.paginationNavArrowLeft}></div>
                </a>
              )}
              <a className={classes.paginationNavPagesText}>1</a>
              <a className={classes.paginationNavPagesInterval}>...</a>
              <a className={classes.paginationNavPagesText}>4</a>
              <a className={classes.paginationNavCurrentPage}>
                {props.currentPage}
              </a>
              <a className={classes.paginationNavPagesText}>6</a>
              <a className={classes.paginationNavPagesInterval}>...</a>
              <a className={classes.paginationNavPagesText}>10</a>
              {props.currentPage < props.qtdPages ? (
                <Link href={`/?page=${props.currentPage + 1}`}>
                  <a>
                    <div className={classes.paginationNavArrowRight}></div>
                  </a>
                </Link>
              ) : (
                <a>
                  <div className={classes.paginationNavArrowRight}></div>
                </a>
              )}
            </div>
          </>
          {/* ) : null} */}
        </div>
      </div>
    </>
  );
};

export default ClustersOverviewNavFooter;
