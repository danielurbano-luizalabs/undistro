import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TopbarMenuItemButton from './topbarMenuItemButton'
import Navbar from './navbar'
import styles from './topbar.module.css'

import topBarLogo from '@/public/img/logo-topbar.svg'

type Props = {}

const Topbar = (props: Props) => {
  let topBarContainerClasses = [styles.topBarContainer, 'responsiveWidth'].join(' ')
  let topBarMenuAreaClasses = [styles.topBarMenuArea, 'responsiveWidth'].join(' ')
  return (
    <>
      <header className={styles.teste}>
        {/* TOPBAR CONTAINER */}

        <div className={topBarContainerClasses}>
          {/* LOGO */}

          <div className={styles.topBarLogoArea}>
            <div className={styles.topLogo}>
              <Image src={topBarLogo} alt="UnDistro Logo" />
            </div>
          </div>

          {/* TOP MENU */}

          {/* Divider */}

          <div className={styles.topBarDividerArea}>
            <div className={styles.topBarDivider}></div>
          </div>

          <div className={topBarMenuAreaClasses}>
            <TopbarMenuItemButton title="create" id={styles.menuCreateButton} />
            <TopbarMenuItemButton title="modify" id={styles.menuModifyButton} />
            <TopbarMenuItemButton title="manage" id={styles.menuManageButton} />
            <TopbarMenuItemButton title="preferences" id={styles.menuPreferencesButton} />
            <TopbarMenuItemButton title="about" id={styles.menuAboutButton} />
          </div>

          {/* LOGOUT */}

          <div className={styles.logoutArea}>
            <Link href="/" passHref>
              <div className={styles.logoutMenu}>
                <a className={styles.logoutText}>logout</a>
              </div>
            </Link>
          </div>
        </div>

        <Navbar />
      </header>
    </>
  )
}

export default Topbar
