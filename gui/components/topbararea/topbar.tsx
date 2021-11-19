import * as React from "react";
import classes from "./topbar.module.css";
import Link from "next/link";
import TopbarMenuItemButton from "./topbarMenuItemButton";
import Navbar from "./navbar";

type Props = {};

const Topbar = (props: Props) => {
  let topBarContainerClasses = [classes.topBarContainer, "responsiveWidth"].join(" ");
  let topBarMenuAreaClasses = [classes.topBarMenuArea, "responsiveWidth"].join(" ");
  return (
    <>
      <header className={classes.teste}>

        {/* TOPBAR CONTAINER */}

        <div className={topBarContainerClasses}>


          {/* LOGO */}

          <div className={classes.topBarLogoArea}>
            <div className={classes.topLogo}>
              <img src="/img/logo-topbar.svg" />
            </div>
          </div>


          {/* TOP MENU */}

          {/* Divider */}

          <div className={classes.topBarDividerArea}>
            <div className={classes.topBarDivider}></div>
          </div>

          <div className={topBarMenuAreaClasses}>
            <Link href="">
              <TopbarMenuItemButton title="create" id="menuCreateButton" />
            </Link>
            <Link href="">
              <TopbarMenuItemButton title="modify" id="menuModifyButton" />
            </Link>
            <Link href="">
              <TopbarMenuItemButton title="manage" id="menuManageButton" />
            </Link>
            <Link href="">
              <TopbarMenuItemButton title="preferences" id="menuPreferencesButton"
              />
            </Link>
            <Link href="">
              <TopbarMenuItemButton title="about" id="menuAboutButton" />
            </Link>
          </div>


          {/* LOGOUT */}

          <div className={classes.logoutArea}>
            <Link href="#">
              <div className={classes.logoutMenu}>
                <a href="#" className={classes.logoutText}>
                  logout
                </a>
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
