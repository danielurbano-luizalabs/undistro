import * as React from "react";
import Topbar from "../topbararea/topbar";
import Workarea from "../workarea/workarea";

type Props = {
  children?: React.ReactNode;
};

const Workspace = (props: Props) => {
  return (
    <>
      <Topbar />
      <Workarea />
    </>
  );
};

export default Workspace;
