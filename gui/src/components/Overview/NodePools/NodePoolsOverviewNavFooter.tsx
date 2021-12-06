import classes from './NodePoolsOverviewNavFooter.module.css'

type Props = {}

const NodePoolsOverviewNavFooter = (props: Props) => {
  return (
    <>
      <div className={classes.tableFooterContainer}>
        <div className={classes.tableFooter}>
          <div className={classes.navFooterResults}>
            <a className={classes.navFooterResultsText}>10 Results</a>
          </div>

          <div className={classes.navFooterJumpToPage}>
            <a className={classes.navFooterJumpToPageText}>Jump to page</a>
          </div>

          <div className={classes.paginationSearchArea}>
            <input className={classes.paginationSearchBox} placeholder="5" type="text"></input>
          </div>

          <div className={classes.paginationNavContainer}>
            <a href="#">
              <div className={classes.paginationNavArrowLeft}></div>
            </a>
            <a className={classes.paginationNavPagesText}>1</a>
            <a className={classes.paginationNavPagesInterval}>...</a>
            <a className={classes.paginationNavPagesText}>4</a>
            <a className={classes.paginationNavCurrentPage}>5</a>
            <a className={classes.paginationNavPagesText}>6</a>
            <a className={classes.paginationNavPagesInterval}>...</a>
            <a className={classes.paginationNavPagesText}>10</a>
            <a href="#">
              <div className={classes.paginationNavArrowRight}></div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default NodePoolsOverviewNavFooter
