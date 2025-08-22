import { NextRequest, NextResponse } from "next/server"

const isPasswordEnabled = !!process.env.ADMIN_PASSWORD

export async function middleware(req: NextRequest) {
  console.log({isPasswordEnabled})

  const isLoggedIn = req.cookies.has("icstrouse-login")
  console.log({isLoggedIn})
  
  const isAdminPath = req.nextUrl.pathname.startsWith("/admin")
  console.log({isAdminPath})

  if (isPasswordEnabled && isAdminPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
      * Match all request paths except for the ones starting with:
      * - api (API routes)
      * - _next/static (static files)
      * - favicon.ico (favicon file)
      */
    '/((?!api|_next/static|favicon.ico|under-development.svg).*)',
  ],
}