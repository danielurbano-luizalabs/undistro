import { useState } from 'react'
import Image from 'next/image'
import classes from './LeftMenuItemButton.module.css'
import classNames from 'classnames'

type LeftMenuItemProps = {
  id: string
  children?: React.ReactNode
  title: string
  item: any
}

const LeftMenuItemButton = ({ id, title, item }: LeftMenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleState = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div id={id} title={title} className={classes.leftMenuButtonContainer} onClick={toggleState}>
        <button className={classes.leftMenuButton}>
          <div className={classes.leftMenuButton}>
            <div className={classes.leftMenuButtonIcon}>
              <Image src={item.src} alt={item.alt} />
            </div>
            <div className={classes.leftMenuButtonText}>
              <a className={'upperCase'}>{title}</a>
            </div>
            <div
              className={classNames(classes.leftMenuButtonArrow, {
                [classes.leftMenuButtonArrowOpen]: isOpen
              })}></div>
          </div>
        </button>
        <div
          className={classNames(classes.leftMenuPanelCollapse, {
            [classes.leftMenuPanelClose]: !isOpen
          })}>
          <ol className={classes.leftMenuPanelList}>
            <li className={classes.leftMenuPanelListItem}>Item 1</li>
            <li className={classes.leftMenuPanelListItem}>Item 2</li>
            <li className={classes.leftMenuPanelListItem}>Item 3</li>
          </ol>
        </div>
      </div>
    </>
  )
}

export default LeftMenuItemButton
