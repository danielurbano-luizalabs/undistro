import { useRouter } from 'next/router'
import { createRef, useEffect, useState, useCallback } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { Cluster } from '../../lib/cluster'
import { paginate } from '../../lib/pagination'
import { MenuActions } from '../MenuActions/MenuActions'
import Page404message from '../page404/page404message'
import { useClusters } from '../workspace/clusterctx'
import classes from './clustersOverview.module.css'
import ClustersOverviewEmptyRow from './clustersOverviewEmptyRow'
import { ClusterOverviewFooter } from './clustersOverviewNavFooter'
import ClustersOverviewRow from './clustersOverviewRow'

type ClusterOverviewProps = {
  clusters?: Cluster[]
  page: string
}

const ClustersOverview = ({ clusters, page }: ClusterOverviewProps) => {
  const router = useRouter()

  const { clusters: selectedClusters, setClusters: setSelectedClusters } = useClusters()

  const rowHeight = 36
  const tableContainerRef = createRef<HTMLDivElement>()
  const tableRef = createRef<HTMLTableElement>() || undefined
  const [clustersList, setClustersList] = useState<Cluster[]>([])
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const { height } = useResizeDetector<HTMLDivElement>({
    targetRef: tableContainerRef
  })
  const [qtyPages, setQtyPages] = useState<number>(1)
  const [isValidPage, setValidPage] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(0)
  const [initialContainerSize, setInitialContainerSize] = useState<number>(0)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 })

  const columns = ['provider', 'flavor', 'k8s version', 'cluster group', 'machines', 'age', 'status']

  const changeCheckbox = (checked: boolean) => {
    if (checked) {
      let cls: string[] = []
      clustersList?.forEach(c => {
        cls.push(c.name)
      })
      setSelectedClusters(cls)
    } else {
      setSelectedClusters([])
      setAllChecked(false)
    }
  }

  const handleClick = event => {
    const { target } = event
    const targetRect = target.getBoundingClientRect()

    const tableContainer = document.getElementById('tableContainer')
    const tableContainerRect = tableContainer.getBoundingClientRect()
    const pointerOffset = 8

    let menuPos = {
      left: targetRect.left - tableContainerRect.left - pointerOffset,
      top: pointerOffset + (targetRect.bottom - tableContainerRect.top + (targetRect.top - tableContainerRect.top)) / 2
    }

    setIsOpen(true)
    setMenuPosition(menuPos)
  }

  const handleUserClick = useCallback(event => {
    event.stopPropagation()
    if (event.target.className.includes('actions')) {
      handleClick(event)
    } else {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleUserClick)
    return () => {
      window.removeEventListener('click', handleUserClick)
    }
  }, [handleUserClick])

  let pageNumber = parseInt(page)
  const pagesCalc = useCallback(() => {
    if (qtyPages && pageNumber > qtyPages) {
      setValidPage(false)
    } else {
      setValidPage(true)
    }

    const pageFooterHeight = 44
    let pageQtyItems = Math.trunc((height! - pageFooterHeight!) / rowHeight)
    pageQtyItems = pageQtyItems - 1 // ignore table header
    setPageSize(pageQtyItems)

    if (pageQtyItems > 0) {
      let qtyPages = Math.ceil(clusters?.length! / pageQtyItems)
      setQtyPages(qtyPages)
    }
    let pageLists = paginate(clusters!, pageQtyItems)
    if (pageLists.length >= pageNumber) {
      let items = pageLists[pageNumber - 1]
      setClustersList(items)
    }
  }, [height, pageNumber, qtyPages, clusters])

  useEffect(() => {
    if (height) {
      if (initialContainerSize == 0) {
        setInitialContainerSize(height!)
        return
      }
      if (initialContainerSize > 0) {
        pagesCalc()
      }
    }
  }, [height, initialContainerSize, isValidPage, qtyPages, router, pagesCalc])

  useEffect(() => {
    setSelectedClusters([])
  }, [pageNumber, setSelectedClusters])

  useEffect(() => {
    let displayedClusters = clustersList.filter(e => e.name != '')
    setAllChecked(selectedClusters?.length == displayedClusters?.length)
  }, [clustersList, selectedClusters])

  const renderClusters = () => {
    let clusters = []
    for (let i = 0; i < clustersList.length + (pageSize - clustersList.length); i++) {
      if (clustersList[i] === undefined) {
        clusters.push(<ClustersOverviewEmptyRow key={i} />)
      } else {
        clusters.push(<ClustersOverviewRow key={i} cluster={clustersList[i]} disabled={false} />)
      }
    }
    return clusters
  }

  return (
    <>
      <div className={classes.clustersOverviewContainer}>
        <div id="tableContainer" className={classes.clustersOverviewTableContainer} ref={tableContainerRef}>
          {isValidPage ? (
            <>
              <table ref={tableRef} id="table" className={classes.clustersOverviewTable}>
                <thead>
                  <tr>
                    <th>
                      <div className={classes.tableCheckboxAllIconContainer}>
                        <label className={classes.tableCheckboxControlAll}>
                          <input
                            className={classes.tableCheckboxAll}
                            onChange={e => changeCheckbox(e.target.checked)}
                            type="checkbox"
                            name="checkbox"
                            checked={allChecked}
                          />
                        </label>
                      </div>
                    </th>
                    <th>
                      <div onClick={handleClick} className={classes.tableIconCol}>
                        <div className={classes.actionsIconAllDisabled}></div>
                      </div>
                    </th>
                    <th className={classes.responsiveTh}>
                      <div className={classes.tableHeaderTitle}>clusters</div>
                    </th>
                    {columns.map((column, i) => (
                      <th key={i}>
                        <div className={classes.tableHeaderTitle}>{column}</div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>{renderClusters()}</tbody>
              </table>
              <MenuActions isOpen={isOpen} position={menuPosition} />
              <ClusterOverviewFooter
                total={clusters?.length || 0}
                currentPage={pageNumber}
                qtdPages={qtyPages}
                pageSize={pageSize}
              />
            </>
          ) : (
            <Page404message />
          )}
        </div>
      </div>
    </>
  )
}

export default ClustersOverview
