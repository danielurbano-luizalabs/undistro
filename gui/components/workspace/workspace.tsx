import * as React from "react";
import classes from "./workspace.module.css";
import Topbar from "../topbararea/topbar";
import Workarea from "../workarea/workarea";
import Page404 from "../page404/page404";
{/*import Loginarea from "../loginarea/loginArea"*/}

type Props = {
  children: React.ReactNode;
};

const Workspace = (props: Props) => {
  return (
    <>
      {/*<Page404 />*/}
      {/*<Loginarea />*/}
      <Topbar />
      <Workarea />
    </>
  );
};

export default Workspace;
