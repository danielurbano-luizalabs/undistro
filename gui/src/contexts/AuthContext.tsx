import type { FunctionComponent } from 'react'
import { createContext, useContext } from 'react'
import { useQueryClient } from 'react-query'
import { fetchProviders } from '@/lib/auth'

const AuthContext = createContext(null)

AuthContext.displayName = 'AuthenticationContext'

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FunctionComponent = ({ children }) => {
  const queryClient = useQueryClient()

  const appLogout = () => {
    // TODO: implement logout logic
    queryClient.clear()
  }
  // TODO: pass auth lib functions as value
  return <AuthContext.Provider value={{ fetchProviders }}>{children}</AuthContext.Provider>
}
