import NextAuth from "next-auth/next"
import "next-auth/jwt"
import GitHubProvider from "next-auth/providers/github";
import { createStorage } from "unstorage"
import { UnstorageAdapter } from "@auth/unstorage-adapter"
import { AuthOptions } from "next-auth";

if (!process.env.AUTH_GITHUB_ID) {
  throw 'GITHUB_ID not found';
}
if (!process.env.AUTH_GITHUB_SECRET) {
  throw 'GITHUB_SECRET not found';
}

const storage = createStorage()

export const authOptions: AuthOptions = {
  debug: true,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  adapter: UnstorageAdapter(storage),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken

      return session
    },
  },
}

export const { auth, signIn, signOut } = NextAuth(authOptions)

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
