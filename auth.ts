import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const isProtected = request.nextUrl.pathname.startsWith("/dashboard");
      if (isProtected) return !!auth;
      return true;
    },
  },
});
