import Cookies from 'js-cookie'
import api from '@/lib/axios'
import { btoa } from '@/helpers/encoding'

const AUTH_KEY = '__undistro_auth'

export function setToken(token: string): string {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, token)
  }
  return token
}

export function getToken(): string {
  if (typeof window !== 'undefined') {
    return Cookies.get(AUTH_KEY)
  }
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY)
    Cookies.remove(AUTH_KEY)
  }
}

export async function fetchProviders() {
  const openIdConfigurationUrl = '/auth/.well-known/openid-configuration'
  const { data: openIdConfiguration } = await api(openIdConfigurationUrl)

  const providersUrl =
    openIdConfiguration['discovery.supervisor.pinniped.dev/v1alpha1']['pinniped_identity_providers_endpoint']
  const { data: identityProviders } = await api(providersUrl)

  const providers = identityProviders['pinniped_identity_providers'].map(({ name }: { name: string }) => {
    return name.split('-')[1]
  }) as string[]

  return providers
}

function setAuthCredentials(ca, clientCertificateData, clientKeyData, endpoint) {
  const authToken = JSON.stringify({
    ca,
    cert: clientCertificateData,
    endpoint,
    key: clientKeyData
  })

  Cookies.set('undistro-ca', ca)
  Cookies.set('undistro-cert', clientCertificateData)
  Cookies.set('undistro-key', clientKeyData)
  Cookies.set(AUTH_KEY, btoa(authToken))
}

export async function fetchUserCertificates() {
  const userCertificatesUrl = '/uapi/authcluster?name=management&namespace=undistro-system'
  const {
    data: {
      ca,
      endpoint,
      credentials: {
        status: { clientCertificateData, clientKeyData }
      }
    }
  } = await api(userCertificatesUrl, { withCredentials: true })

  setAuthCredentials(ca, clientCertificateData, clientKeyData, endpoint)
}
