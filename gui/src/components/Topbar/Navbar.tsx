import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useClusters } from '@/contexts/ClusterContext'

import styles from './navbar.module.css'


export interface Breadcrumb {
  /** Breadcrumb title. Example: 'blog-entries' */
  breadcrumb: string

  /** The URL which the breadcrumb points to. Example: 'blog/blog-entries' */
  href: string
}

const Navbar = () => {
  const router = useRouter()
  const { clusters, setClusters } = useClusters()
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(null)
  const [clustersName, setClustersName] = useState<string[]>(clusters)

  useEffect(() => {
    if (clusters) {
      setClustersName(clusters)
    }
    if (router) {
      const linkPath = router.pathname.split('/')
      linkPath.shift()

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/')
        }
      })

      setBreadcrumbs(pathArray)
    }
  }, [router, clusters])

  if (!breadcrumbs) {
    return null
  }
  let navbarContainerClasses = [styles.navbarContainer, 'responsiveWidth'].join(' ')
  let breadCrumbClasses = [styles.breadCrumb, 'upperCase'].join(' ')
  let navbarBreadCrumbAreaClasses = [styles.navbarBreadCrumbArea, 'responsiveWidth'].join(' ')
  let selectedMessage = `multiple clusters selected`
  if (clustersName?.length === 1) {
    selectedMessage = clustersName[0]
  } else if (clustersName?.length === 0 || clustersName == undefined) {
    selectedMessage = 'Select a cluster to begin'
  }
  return (
    <>
      <div className={navbarContainerClasses}>
        <Link href="/">
          <a className={styles.navbarHomeButtonArea}>
            <div className={styles.navbarHomeIconArea}></div>
          </a>
        </Link>
        <div className={navbarBreadCrumbAreaClasses}>
          <ol className={breadCrumbClasses}>
            <li key="1" className={styles.breadCrumb}>
              <Link href="/">
                <a className={styles.breadCrumb}>clusters</a>
              </Link>
            </li>
            <li key="2">
              <a className={styles.breadCrumbSelObject}>{selectedMessage}</a>
            </li>
            {breadcrumbs.map((breadcrumb, index) => {
              if (index == 0 && breadcrumb.breadcrumb == '') {
                return
              }
              if (index === breadcrumbs.length - 1) {
                return (
                  <li key={index + 3}>
                    <a>{breadcrumb.breadcrumb}</a>
                  </li>
                )
              } else {
                return (
                  <li>
                    <Link href={breadcrumb.href}>
                      <a>{breadcrumb.breadcrumb}</a>
                    </Link>
                  </li>
                )
              }
            })}
          </ol>
        </div>
        <div className={styles.navbarSearchArea}>
          <input id="searchClear" className={styles.navbarSearchBox} type="search"></input>
          <div className={styles.navbarSearchBoxIcon}></div>
        </div>
      </div>
    </>
  )
}

export default Navbar
