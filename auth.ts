import axiosInstance from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { decodeToken } from "@/utils/jwt-decode";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    try {
      // Hacemos una solicitud al backend para autenticar al usuario
      const response = await axiosInstance.post("/auth/login", credentials);

      if (response.data?.data) {
        // Decodificar el token y devolver datos del usuario
        const decodedToken = decodeToken(response.data.data);
        return {
          email: credentials?.email,
          token: response.data.data,
          ...decodedToken,
        };
      }
      return null; // Retornar null si las credenciales no son válidas
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return null;
    }
  },
});

const config: NextAuthConfig = {
  providers: [credentialsConfig],
  pages: {
    signIn: "/login", // Página de login personalizada
  },
  callbacks: {
    async jwt({ token, user }) {
      // Almacenar el token JWT en el JWT del usuario
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // Almacenar los datos del usuario en la sesión
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.token = token.accessToken as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

// Exportar los elementos necesarios desde NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth(config);
