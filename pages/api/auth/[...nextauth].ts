import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    // OAuth authentication providers
    Providers.Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    // Sign in with passwordless email link
    // Providers.Email({
    //   server: process.env.MAIL_SERVER,
    //   from: '<no-reply@example.com>'
    // }),
  ],
  // SQL or MongoDB database (or leave empty)
  database: process.env.DATABASE_URL,
  debug: false
})