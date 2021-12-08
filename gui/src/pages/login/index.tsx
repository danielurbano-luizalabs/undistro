import type { NextPage } from 'next'
import Image from 'next/image'

import logoUnDistroLogin from '@/public/img/logoUnDistroLogin.svg'
import backedByGetup from '@/public/img/backedByGetup.svg'

import styles from './login.module.css'

type Props = {}

const Login: NextPage = (props: Props) => {
  return (
    <>
      <div className={styles.loginPageContainer}>
        <div className={styles.contentTab}>
          <div className={styles.contentTabProviders}>
            <div className={styles.contentTabLogo}>
              <Image src={logoUnDistroLogin} alt="UnDistro Logo" />
            </div>

            <div className={styles.providersSelection}>
              <div className={styles.selectProviderText}>Sign in with</div>

              <div className={styles.providersContainer}>
                <div className={styles.providersIconContainer}>
                  <div className={styles.providerText}>Google</div>
                  <div className={styles.providerGoogle}></div>
                </div>

                <div className={styles.providersIconContainer}>
                  <div className={styles.providerText}>Amazon</div>
                  <div className={styles.providerAmazon}></div>
                </div>

                <div className={styles.providersIconContainer}>
                  <div className={styles.providerText}>Microsoft</div>
                  <div className={styles.providerMicrosoft}></div>
                </div>

                <div className={styles.providersIconContainer}>
                  <div className={styles.providerText}>Github</div>
                  <div className={styles.providerGithub}></div>
                </div>

                <div className={styles.providersIconContainer}>
                  <div className={styles.providerText}>Gitlab</div>
                  <div className={styles.providerGitlab}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contentTabFooter}>
            <Image src={backedByGetup} alt="Backed by GetUp" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
