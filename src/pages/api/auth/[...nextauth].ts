import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { fauna } from '../../../services/fauna';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user'
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email)
                ) // q.Match
              ) // q.Exists
            ), // q.Not
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ), // q.Create
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email)
              ) // q.Match
            ) // q.Get
          ) // q.If
        );
        
        return true;
      } catch {
        return false;
      }
    },
  }
});