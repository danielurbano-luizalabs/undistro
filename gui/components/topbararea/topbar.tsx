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

            <TopbarMenuItemButton title="create" id="menuCreateButton" />
            <TopbarMenuItemButton title="modify" id="menuModifyButton" />
            <TopbarMenuItemButton title="manage" id="menuManageButton" />
            <TopbarMenuItemButton title="preferences" id="menuPreferencesButton"/>
            <TopbarMenuItemButton title="about" id="menuAboutButton" />

            {/*<Link href="/" passHref>
              
            </Link>
            <Link href="/" passHref>
              
            </Link>
            <Link href="/" passHref>
              
            </Link>
            <Link href="/" passHref>
              
            </Link>
            <Link href="/" passHref>
              
            </Link>*/}

          </div>


          {/* LOGOUT */}

          <div className={classes.logoutArea}>
            <Link href="/" passHref>
              <div className={classes.logoutMenu}>
                <a className={classes.logoutText}>
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
