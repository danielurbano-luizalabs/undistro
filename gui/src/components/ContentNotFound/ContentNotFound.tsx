import Link from 'next/link'
import classNames from 'classnames'

import styles from './ContentNotFound.module.css'

const ContentNotFound = () => (
  <div className={styles.ContentNotFoundContainer}>
    <div className={styles.ContentNotFoundMonitorMessage}></div>
    <div className={classNames(styles.ContentNotFoundMainTextLine1, 'upperCase')}>it seems that one of our</div>
    <div className={classNames(styles.ContentNotFoundMainTextLine2, 'upperCase')}>trainees screwed up again..</div>
    <div className={classNames(styles.ContentNotFoundSecondaryTextLine1, 'upperCase')}>
      you can go to the{' '}
      <Link href="/">
        <a>home page</a>
      </Link>{' '}
      while
    </div>
    <div className={classNames(styles.ContentNotFoundSecondaryTextLine2, 'upperCase')}>
      we look for someone to blame
    </div>
  </div>
)

export default ContentNotFound
