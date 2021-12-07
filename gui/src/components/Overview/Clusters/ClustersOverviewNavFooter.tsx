import React from 'react'
import { useRouter } from 'next/router'

import Pagination from '@/components/Pagination/Pagination'

import styles from './ClustersOverviewNavFooter.module.css'

type Props = {
  total: number
  currentPage: number
  pageSize: number
  qtdPages: number
  refer?: React.ForwardedRef<HTMLDivElement>
}

const ClusterOverviewFooter = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <ClustersOverviewNavFooter
      total={props.total || 0}
      currentPage={props.currentPage}
      qtdPages={props.qtdPages}
      pageSize={props.pageSize}
      refer={ref}
    />
  )
})

ClusterOverviewFooter.displayName = 'ClusterOverviewFooter'

const ClustersOverviewNavFooter = (props: Props) => {
  const router = useRouter()

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let el = e.target as HTMLInputElement
    router.query.page = el.value
    if (e.key == 'Enter' && parseInt(el.value) != props.currentPage) {
      if (parseInt(el.value) <= props.qtdPages) {
        router.push({
          query: { page: el.value }
        })
      }
    }
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let el = e.target as HTMLInputElement
    if (parseInt(el.value) <= props.qtdPages && parseInt(el.value) != props.currentPage) {
      router.push({
        query: { page: el.value }
      })
    }
  }
  return (
    <>
      <div ref={props.refer} id="pageFooter" className={styles.tableFooterContainer}>
        <div className={styles.tableFooter}>
          <div className={styles.navFooterResults}>
            <a className={styles.navFooterResultsText}>{props.total} Results</a>
          </div>
          {props.qtdPages > 1 ? (
            <>
              <div className={styles.navFooterJumpToPage}>
                <a className={styles.navFooterJumpToPageText}>Jump to page</a>
              </div>

              <div className={styles.paginationSearchArea}>
                <input
                  onKeyPress={e => pressEnter(e)}
                  onBlur={e => onBlur(e)}
                  className={styles.paginationSearchBox}
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
          ) : null}
        </div>
      </div>
    </>
  )
}

export { ClusterOverviewFooter }
