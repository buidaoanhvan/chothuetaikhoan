import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

const handler = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // ⏳ 30 ngày
  },
  //thêm role vào token
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Giả sử bạn có trường 'role' trong mô hình User của bạn
        token.role = user.role || "user"; // Mặc định là 'user' nếu không có role
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // Thêm role vào session
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
