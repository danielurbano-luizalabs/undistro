import Link from 'next/link'
import classnames from 'classnames'

import { usePagination, usePaginationProps, DOTS } from '@/hooks/pagination'

import styles from './Pagination.module.css'

type PaginationProps = usePaginationProps & {
  onPageChange: (page: string | number) => void
}

let cx = classnames.bind(styles)

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={styles.paginationNavContainer}>
      <li onClick={onPrevious}>
        <Link href={`/?page=${currentPage - 1}`} passHref>
          <button disabled={currentPage === 1} className={cx(styles.paginationNavArrowLeft)}>
            <a />
          </button>
        </Link>
      </li>
      <div className={styles.navigationPages}>
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <li className={styles.paginationNavPagesInterval} key={`dots-${i}`}>
                &#8230;
              </li>
            )
          }

          return (
            <li
              key={`page-${pageNumber}`}
              className={cx(styles.paginationNavPagesText, {
                [styles.paginationNavCurrentPage]: pageNumber === currentPage
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              <Link href={`/?page=${pageNumber}`}>
                <a>{pageNumber}</a>
              </Link>
            </li>
          )
        })}
      </div>
      <li onClick={onNext}>
        <Link href={`/?page=${currentPage + 1}`} passHref>
          <button disabled={currentPage === lastPage} className={cx(styles.paginationNavArrowRight)}>
            <a />
          </button>
        </Link>
      </li>
    </ul>
  )
}

export default Pagination
