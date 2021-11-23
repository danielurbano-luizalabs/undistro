import * as React from "react";
import Topbar from "../topbararea/topbar";
import Workarea from "../workarea/workarea";

type Props = {
  children?: React.ReactNode;
  selectedClusters?: string[];
};

const Workspace = (props: Props) => {
  return (
    <>
      <Topbar seletedClusters={props.selectedClusters} />
      <Workarea>{props.children}</Workarea>
    </>
  );
};

export default Workspace;
