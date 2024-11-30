import { NextResponse } from "next/server";
import { parseCookies } from "nookies";

export function middleware(request) {
  const cookies = request.cookies.getAll();
  const accessToken = cookies.find(cookie => cookie.name === "accessToken");

  if (!accessToken?.value) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
