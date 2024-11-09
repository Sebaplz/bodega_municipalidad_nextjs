import { auth } from "@/../auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Rutas protegidas que requieren autenticación
  if (!isLoggedIn && nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // Redirigir usuarios autenticados fuera de login/register
  if (
    isLoggedIn &&
    (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
  ) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
