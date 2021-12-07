import Link from 'next/link'
import classes from './ContentNotFound.module.css'

const ContentNotFound = () => {
  let ContentNotFoundMainTextLine1UpperCase = [classes.ContentNotFoundMainTextLine1, 'upperCase'].join(' ')
  let ContentNotFoundMainTextLine2UpperCase = [classes.ContentNotFoundMainTextLine2, 'upperCase'].join(' ')
  let ContentNotFoundSecondaryTextLine1UpperCase = [classes.ContentNotFoundSecondaryTextLine1, 'upperCase'].join(' ')
  let ContentNotFoundSecondaryTextLine2UpperCase = [classes.ContentNotFoundSecondaryTextLine2, 'upperCase'].join(' ')
  return (
    <>
      <div className={classes.ContentNotFoundContainer}>
        <div className={classes.ContentNotFoundMonitorMessage}></div>

        <div className={ContentNotFoundMainTextLine1UpperCase}>it seems that one of our</div>
        <div className={ContentNotFoundMainTextLine2UpperCase}>trainees screwed up again..</div>

        <div className={ContentNotFoundSecondaryTextLine1UpperCase}>
          you can go to the{' '}
          <Link href="/">
            <a>home page</a>
          </Link>{' '}
          while
        </div>
        <div className={ContentNotFoundSecondaryTextLine2UpperCase}>we look for someone to blame</div>
      </div>
    </>
  )
}

export default ContentNotFound
