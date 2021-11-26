import classes from "./navbar.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  selectedClusters?: string[];
};

export interface Breadcrumb {
  /** Breadcrumb title. Example: 'blog-entries' */
  breadcrumb: string;

  /** The URL which the breadcrumb points to. Example: 'blog/blog-entries' */
  href: string;
}

const Navbar = (props: Props) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(
    null
  );

  useEffect(() => {
    if (router) {
      const linkPath = router.pathname.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }
  let navbarContainerClasses = [
    classes.navbarContainer,
    "responsiveWidth",
  ].join(" ");
  let breadCrumbClasses = [classes.breadCrumb, "upperCase"].join(" ");
  let navbarBreadCrumbAreaClasses = [
    classes.navbarBreadCrumbArea,
    "responsiveWidth",
  ].join(" ");
  let selectedMessage = `multiple clusters selected`;
  if (props.selectedClusters?.length === 1) {
    selectedMessage = props.selectedClusters[0];
  } else if (
    props.selectedClusters?.length === 0 ||
    props.selectedClusters == undefined
  ) {
    selectedMessage = "Select a cluster to begin";
  }
  return (
    <>
      <div className={navbarContainerClasses}>
        <a className={classes.navbarHomeButtonArea}>
          <div className={classes.navbarHomeIconArea}></div>
        </a>
        <div className={navbarBreadCrumbAreaClasses}>
          <ol className={breadCrumbClasses}>
            <li key="1" className={classes.breadCrumb}>
              <Link href="/">
                <a className={classes.breadCrumb}>clusters</a>
              </Link>
            </li>
            <li key="2">
              <a className={classes.breadCrumbSelObject}>{selectedMessage}</a>
            </li>
            {breadcrumbs.map((breadcrumb, index) => {
              if (index == 0 && breadcrumb.breadcrumb == "") {
                return;
              }
              if (index === breadcrumbs.length - 1) {
                return (
                  <li key={index + 3}>
                    <a>{breadcrumb.breadcrumb}</a>
                  </li>
                );
              } else {
                return (
                  <li>
                    <Link href={breadcrumb.href}>
                      <a>{breadcrumb.breadcrumb}</a>
                    </Link>
                  </li>
                );
              }
            })}
          </ol>
        </div>
        <div className={classes.navbarSearchArea}>
          <input
            id="searchClear"
            className={classes.navbarSearchBox}
            type="search"
          ></input>
          <div className={classes.navbarSearchBoxIcon}></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
