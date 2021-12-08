import LeftMenuArea from '@/components/LeftMenu/LeftMenuArea'
import styles from './Workarea.module.css'

type Props = {
  children?: React.ReactNode
}

const Workarea = (props: Props) => {
  return (
    <>
      <div className={styles.mainWorkspaceArea}>
        <div className={styles.leftMenuArea}>
          <LeftMenuArea />
        </div>
        <div className={styles.mainDisplayArea}>{props.children}</div>
      </div>
    </>
  )
}

export default Workarea
