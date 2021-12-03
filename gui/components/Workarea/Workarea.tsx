import * as React from 'react'
import classes from './Workarea.module.css'
import LeftMenuArea from '../LeftMenu/LeftMenuArea'

type Props = {
  children?: React.ReactNode
}

const Workarea = (props: Props) => {
  return (
    <>
      <div className={classes.mainWorkspaceArea}>
        <div className={classes.leftMenuArea}>
          <LeftMenuArea />
        </div>
        <div className={classes.mainDisplayArea}>{props.children}</div>
      </div>
    </>
  )
}

export default Workarea
