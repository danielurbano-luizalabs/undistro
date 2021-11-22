import * as React from "react";
import classes from "./leftmenuarea.module.css";
import LeftMenuItemButton from "./leftMenuItemButton";
import Link from "next/link";

type Props = {};

const Leftmenuarea = (props: Props) => {
    {/*let navbarContainerClasses = [classes.navbarContainer, "responsiveWidth"].join(" ");*/ }
    let leftMenuButtonTextClasses = [classes.leftMenuButtonText, "upperCase"].join(" ");
    return (
        <>

            <div className={classes.leftNav}>
                <LeftMenuItemButton title="clusters" id="menuClusterButton" />
            </div>

        </>
    );
}

export default Leftmenuarea;


