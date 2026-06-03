import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations/auth";
import { mockUserStore } from "@/lib/mockUserStore";

const USE_MOCK_DB = true;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        if (USE_MOCK_DB) {
          const user = await mockUserStore.findOne({ email: validated.data.email });
          if (!user) return null;

          const isPasswordCorrect = await bcrypt.compare(validated.data.password, user.password);
          if (!isPasswordCorrect) return null;

          return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        // MongoDB path
        try {
          const dbConnect = (await import("@/lib/mongodb")).default;
          const User = (await import("@/models/User")).default;
          
          await dbConnect();
          
          const user = await User.findOne({ email: validated.data.email }).select("+password");
          if (!user) return null;


          const isPasswordCorrect = await bcrypt.compare(validated.data.password, user.password);
          if (!isPasswordCorrect) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};