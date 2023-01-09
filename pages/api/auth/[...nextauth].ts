import axios from "axios";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })    
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user);
      axios.post('/api/signup/google', user)
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  } 
})