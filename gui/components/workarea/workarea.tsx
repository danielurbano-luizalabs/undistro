import * as React from "react";
import classes from "./workarea.module.css";
import Leftmenuarea from "../leftmenu/leftmenuarea";

type Props = {
  children?: React.ReactNode;
};

const Workarea = (props: Props) => {
  return (
    <>
      <div className={classes.mainWorkspaceArea}>
        <div className={classes.leftMenuArea}>
          <Leftmenuarea />
        </div>
        <div className={classes.mainDisplayArea}>{props.children}</div>
      </div>
    </>
  );
};

export default Workarea;
