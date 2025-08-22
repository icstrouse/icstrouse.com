import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json()

  if (process.env.ADMIN_PASSWORD === body.password) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'

    const response = NextResponse.redirect(url, 302)

    response.cookies.set('icstrouse-login', 'true', {
      path: '/',
      httpOnly: true,
    })

    return response
  } else {
    return NextResponse.json({ error: "Invalid login" }, { status: 500 })
  }
}