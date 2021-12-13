import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Cookies from 'js-cookie'

import logoUnDistroLogin from '@/public/img/logoUnDistroLogin.svg'
import backedByGetup from '@/public/img/backedByGetup.svg'

import styles from './login.module.css'
import { useAuth } from '@/contexts/AuthContext'
import { fetchUserCertificates } from '@/lib/auth'
import api from '@/lib/axios'

const Login: NextPage = () => {
  const [isFetchingCert, setIsFetchingCert] = useState(false)
  const [providers, setProviders] = useState<string[]>([])

  const { fetchProviders } = useAuth()

  const PROVIDERS = {
    aws: 'Amazon',
    github: 'Github',
    google: 'Google',
    microsoft: 'Microsoft',
    gitlab: 'Gitlab'
  }

  useEffect(() => {
    ;(async () => {
      fetchProviders().then(providers => {
        setProviders(providers)
      })
    })()

    console.log(api.defaults.headers.common['Authorization'])
  }, [])

  const handleProviderClick = (provider: string) => {
    const modalSize = {
      width: 400,
      height: 600
    }

    const modalPosition = {
      left: screen.width / 2 - modalSize.width / 2,
      top: screen.height / 2 - modalSize.height / 2
    }

    const authWindow = window.open(
      `${process.env.UNDISTRO_API_URL}uapi/login?idp=${provider}`,
      'ModalPopUp',
      `width=${modalSize.width}px,height=${modalSize.height}px,` + `left=${modalPosition.left},top=${modalPosition.top}`
    )

    const timer = setInterval(async () => {
      if (authWindow?.closed) {
        if (Cookies.get('undistro-login')) {
          if (!isFetchingCert) {
            setIsFetchingCert(true)
            await fetchUserCertificates()
            window.location.href = '/'
          }
        } else {
          clearInterval(timer)
        }
      }
    }, 1000)
  }

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
                {providers.map(providerId => (
                  <div
                    key={`provider-${providerId}`}
                    onClick={async () => handleProviderClick(providerId)}
                    className={styles.providersIconContainer}
                  >
                    <div className={styles.providerText}>{PROVIDERS[providerId]}</div>
                    <div className={styles[`provider${PROVIDERS[providerId]}`]}></div>
                  </div>
                ))}
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
