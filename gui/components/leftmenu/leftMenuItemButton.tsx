import * as React from "react";
import classes from "./leftMenuItemButton.module.css";

type Props = {
  id: string;
  children?: React.ReactNode;
  title: string;
};

const LeftMenuItemButton = (props: Props) => {
  return (
    <>
      <div
        id={props.id}
        title={props.title}
        className={classes.leftMenuButtonContainer}
      >
        <button className={classes.leftMenuButton}>
          <div className={classes.leftMenuButton}>
            <div className={classes.leftMenuButtonIcon}></div>

            <div className={classes.leftMenuButtonText}>
              <a className={"upperCase"}>{props.title}</a>
            </div>

            <div className={classes.leftMenuButtonArrow}></div>
          </div>
        </button>
      </div>
    </>
  );
};

export default LeftMenuItemButton;





