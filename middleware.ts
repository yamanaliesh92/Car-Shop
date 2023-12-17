import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;
  // const isPublic = path === "/login" || path === "/sign";
  // const token = request.cookies.get("token")?.value || "";
  // if (isPublic && token) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }
  // if (!isPublic && !token) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
  // return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/sign", "/login"],
};
