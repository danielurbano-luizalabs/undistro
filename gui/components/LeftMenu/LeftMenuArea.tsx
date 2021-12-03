import * as React from 'react'
import classes from './LeftMenuArea.module.css'
import menuClustersIcon from '@/public/img/menuClustersIcon.svg'
import menuNodePoolsIcon from '@/public/img/menuNodepoolsIcon.svg'
import menuSecurityIcon from '@/public/img/menuSecurityIcon.svg'
import menuLogsIcon from '@/public/img/menuLogsIcon.svg'

import LeftMenuItemButton from './LeftMenuItemButton'

type Props = {}

const LeftMenuArea = (props: Props) => {
  {
    /*let navbarContainerClasses = [classes.navbarContainer, "responsiveWidth"].join(" ");*/
  }

  const leftMenuItems = [
    {
      id: 'menuClusterButton',
      alt: 'Clusters',
      src: menuClustersIcon
    },
    {
      id: 'menuNodePoolsButton',
      alt: 'Node Pools',
      src: menuNodePoolsIcon
    },
    {
      id: 'menuSecurityButton',
      alt: 'Security',
      src: menuSecurityIcon
    },
    {
      id: 'menuLogsButton',
      alt: 'Logs',
      src: menuLogsIcon
    }
  ]

  // let leftMenuButtonTextClasses = [classes.leftMenuButtonText, 'upperCase'].join(' ')
  return (
    <>
      <div className={classes.leftNav}>
        {leftMenuItems.map(item => (
          <LeftMenuItemButton id={item.id} key={`menu-${item.id}`} title={item.alt} item={item} />
        ))}
      </div>
    </>
  )
}

export default LeftMenuArea
