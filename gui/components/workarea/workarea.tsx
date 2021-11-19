import * as React from "react";
import classes from "./workarea.module.css";
import Leftmenuarea from "../leftmenu/leftmenuarea"
import Clustersoverview from "../clustersoverview/clustersOverview";
import Page404message from "../page404/page404message";
import Link from "next/link";

type Props = {};

const Workarea = (props: Props) => {
    {/*let navbarContainerClasses = [classes.navbarContainer, "responsiveWidth"].join(" ");*/ }
    return (
        <>

            <div className={classes.mainWorkspaceArea}>

                <div className={classes.leftMenuArea}>
                    <Leftmenuarea />
                </div>
                <div className={classes.mainDisplayArea}>
                    {/*<Page404message />*/}
                    <Clustersoverview />
                </div>

            </div>

        </>
    );
}

export default Workarea;