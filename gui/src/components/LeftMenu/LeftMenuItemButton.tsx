import { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import styles from './LeftMenuItemButton.module.css'

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
    <div id={id} title={title} className={styles.leftMenuButtonContainer}>
      <button
        onClick={toggleState}
        className={classNames(styles.leftMenuButton, {
          [styles.leftMenuButtonActive]: isOpen
        })}
      >
        <div className={styles.leftMenuButton}>
          <div className={styles.leftMenuButtonIcon}>
            <Image src={item.src} alt={item.alt} />
          </div>
          <div className={styles.leftMenuButtonText}>
            <a className={'upperCase'}>{title}</a>
          </div>
          {item.actions.length > 0 && (
            <div
              className={classNames(styles.leftMenuButtonArrow, {
                [styles.leftMenuButtonArrowOpen]: isOpen
              })}
            />
          )}
        </div>
      </button>
      <div
        className={classNames(styles.leftMenuPanelCollapse, {
          [styles.leftMenuPanelClose]: !isOpen
        })}
      >
        <ol className={styles.leftMenuPanelList}>
          {item.actions.map((action: string) => (
            <li key={`action-${id}-${action}`} className={styles.leftMenuPanelListItem}>
              {action}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default LeftMenuItemButton
