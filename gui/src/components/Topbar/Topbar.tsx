import Link from 'next/link'
import Image from 'next/image'

import topBarLogo from '@/public/img/logo-topbar.svg'
import Navbar from './Navbar'

import TopbarMenuItemButton from './TopbarMenuItemButton'
import styles from './Topbar.module.css'
import { signOut } from 'next-auth/react'
import { isIdentityEnabled } from '@/helpers/identity'

const Topbar = () => {
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

          {isIdentityEnabled() && (
            <div className={styles.logoutArea}>
              <div onClick={() => signOut({ redirect: true, callbackUrl: '/login' })} className={styles.logoutMenu}>
                <a className={styles.logoutText}>logout</a>
              </div>
            </div>
          )}
        </div>

        <Navbar />
      </header>
    </>
  )
}

export default Topbar
