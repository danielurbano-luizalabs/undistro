import * as React from "react";
import classes from "./topbarMenuItemButton.module.css";

type Props = {
  id: string;
  children?: React.ReactNode;
  title: string;
};

const TopbarMenuItemButton = (props: Props) => {
  return (
    <>
      <div
        id={props.id}
        title={props.title}
        className={classes.menuTopItemButton}
      >
        <div className={classes.menuTopItemTab}></div>
        <div className={classes.menuTopItemTextArea}>
          <div className={classes.menuTopItemText}>{props.title}</div>
        </div>
      </div>
    </>
  );
};

export default TopbarMenuItemButton;
