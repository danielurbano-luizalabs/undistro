import * as React from "react";
import styles from "./topbar.module.css";
import Link from "next/link";
import TopbarMenuItemButton from "./topbarMenuItemButton";
import Navbar from "./navbar";

type Props = {};

const Topbar = (props: Props) => {
  let topBarContainerClasses = [
    styles.topBarContainer,
    "responsiveWidth",
  ].join(" ");
  let topBarMenuAreaClasses = [styles.topBarMenuArea, "responsiveWidth"].join(
    " "
  );
  return (
    <>
      <header className={styles.teste}>
        {/* TOPBAR CONTAINER */}

        <div className={topBarContainerClasses}>
          {/* LOGO */}

          <div className={styles.topBarLogoArea}>
            <div className={styles.topLogo}>
              <img src="/img/logo-topbar.svg" />
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
            <Link href="/">
              <div className={styles.logoutMenu}>
                <a className={styles.logoutText}>logout</a>
              </div>
            </Link>
          </div>
        </div>

        <Navbar />
      </header>
    </>
  );
};

export default Topbar;
