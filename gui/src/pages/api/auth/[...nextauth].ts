import NextAuth from 'next-auth'
import GitlabProvider from 'next-auth/providers/gitlab'
import GoogleProvider from 'next-auth/providers/google'
import { Provider } from 'next-auth/providers'

const undistroProviders = {
  gitlab: GitlabProvider({
    clientId: process.env.GITLAB_ID,
    clientSecret: process.env.GITLAB_SECRET
  }),
  google: GoogleProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
} as Record<string, Provider>

export default NextAuth({
  providers: [undistroProviders[process.env.IDENTITY_PROVIDER]],
  secret: process.env.SECRET
})
