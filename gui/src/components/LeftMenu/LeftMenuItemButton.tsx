import { useState } from 'react'
import Image from 'next/image'
import classes from './LeftMenuItemButton.module.css'
import classNames from 'classnames'
import { isUint8ClampedArray } from 'util/types'

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
      <div id={id} title={title} className={classes.leftMenuButtonContainer}>
        <button
          onClick={toggleState}
          className={classNames(classes.leftMenuButton, {
            [classes.leftMenuButtonActive]: isOpen
          })}>
          <div className={classes.leftMenuButton}>
            <div className={classes.leftMenuButtonIcon}>
              <Image src={item.src} alt={item.alt} />
            </div>
            <div className={classes.leftMenuButtonText}>
              <a className={'upperCase'}>{title}</a>
            </div>
            {item.actions.length > 0 && (
              <div
                className={classNames(classes.leftMenuButtonArrow, {
                  [classes.leftMenuButtonArrowOpen]: isOpen
                })}
              />
            )}
          </div>
        </button>
        <div
          className={classNames(classes.leftMenuPanelCollapse, {
            [classes.leftMenuPanelClose]: !isOpen
          })}>
          <ol className={classes.leftMenuPanelList}>
            {item.actions.map((action: string) => (
              <li key={`action-${id}-${action}`} className={classes.leftMenuPanelListItem}>
                {action}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}

export default LeftMenuItemButton
