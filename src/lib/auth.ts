import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Skema validasi input login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validasi input dengan Zod
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Cek email sesuai env var
        if (email !== process.env.ADMIN_EMAIL) return null;

        // Verifikasi password dengan bcrypt hash dari env var
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;
        if (!passwordHash) return null;

        const isValid = await bcrypt.compare(password, passwordHash);
        if (!isValid) return null;

        // Return user object untuk sesi
        return {
          id: "admin",
          email: process.env.ADMIN_EMAIL,
          name: "Admin",
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { role: string }).role =
          token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 jam
  },
});
