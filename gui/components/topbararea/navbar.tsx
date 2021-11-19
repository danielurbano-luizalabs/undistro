import * as React from "react";
import classes from "./navbar.module.css";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  let navbarContainerClasses = [classes.navbarContainer, "responsiveWidth"].join(" ");
  let breadCrumbClasses = [classes.breadCrumb, "upperCase"].join(" ");
  let navbarBreadCrumbAreaClasses = [classes.navbarBreadCrumbArea, "responsiveWidth"].join(" ");
  return (
    <>
      <div className={navbarContainerClasses}>
        <a href="" className={classes.navbarHomeButtonArea}>
          <div className={classes.navbarHomeIconArea}></div>
        </a>
        <div className={navbarBreadCrumbAreaClasses}>
          <ol className={breadCrumbClasses}>
            <li className={classes.breadCrumb}><a href="" className={classes.breadCrumb}>clusters</a></li>
            <li><a className={classes.breadCrumbSelObject}>selected cluster name</a></li>
            <li><a>sublevel 01</a></li>
            <li><a>sublevel 02</a></li>
            <li><a>sublevel 03</a></li>
          </ol>
        </div>
        <div className={classes.navbarSearchArea}>
          <input id="searchClear" className={classes.navbarSearchBox} type="search"></input>
          <div className={classes.navbarSearchBoxIcon}></div>
        </div>
      </div>
    </>
  );
}

export default Navbar;