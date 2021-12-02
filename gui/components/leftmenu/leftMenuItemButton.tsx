import Image from 'next/image'
import classes from './leftMenuItemButton.module.css'

type LeftMenuItemProps = {
  id: string
  children?: React.ReactNode
  title: string
  item: any
}

const LeftMenuItemButton = ({ id, title, item }: LeftMenuItemProps) => {
  return (
    <>
      <div id={id} title={title} className={classes.leftMenuButtonContainer}>
        <button className={classes.leftMenuButton}>
          <div className={classes.leftMenuButton}>
            <div className={classes.leftMenuButtonIcon}>
              <Image src={item.src} alt={item.alt} />
            </div>

            <div className={classes.leftMenuButtonText}>
              <a className={'upperCase'}>{title}</a>
            </div>

            <div className={classes.leftMenuButtonArrow}></div>
          </div>
        </button>
      </div>
    </>
  )
}

export default LeftMenuItemButton
