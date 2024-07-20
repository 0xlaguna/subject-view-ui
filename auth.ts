import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';


export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/account/login", {
            method: "POST",
            body: JSON.stringify(parsedCredentials.data),
            headers: { "Content-Type": "application/json" }
          });

          const session = await res.json();

          if (res.ok && session) {
            return session;
          }
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.accessToken = user.token;
        token.name = user.name;
        // @ts-ignore
        token.argonToken = user.token;
        // @ts-ignore
        token.userId = user.user_id;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.user.argonToken = token.argonToken;
      // @ts-ignore
      session.user.id = token.userId;

      return session;
    }
  },
});
