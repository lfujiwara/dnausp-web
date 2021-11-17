import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  GOOGLE_AUTHORIZATION_URL,
  refreshAccessToken,
} from "@auth/google-next-auth";
import { JWT } from "next-auth/jwt";

const EXPIRATION_THRESHOLD = 1000 * 60 * 5;

declare module "next-auth/jwt/types" {
  interface JWT {
    user: User;
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    error: string;
  }
}

declare module "next-auth/core/types" {
  interface Session {
    accessToken: string;
    error: string;
  }
}

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID + "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET + "",
      authorization: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (!!account && !!user)
        return {
          ...token,
          accessToken: account.access_token + "",
          accessTokenExpires:
            Date.now() + (account.expires_in as number) * 1000,
          refreshToken: account.refresh_token + "",
          user,
        };
      if (Date.now() < token.accessTokenExpires - EXPIRATION_THRESHOLD)
        return token;
      return refreshAccessToken(token);
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
});
