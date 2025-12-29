import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/niveau/")) return NextResponse.next();
  const [, , ...parts] = pathname.split("/");

  if (parts.length === 1 && parts[0].toLowerCase() !== parts[0]) {
    return NextResponse.redirect(new URL(`/niveau/${parts[0].toLowerCase()}`, request.url));
  } else if (parts.length >= 2 && (parts[0].toLowerCase() !== parts[0] || parts[1].toLowerCase() !== parts[1])) {
    return NextResponse.redirect(new URL(`/niveau/${parts[0].toLowerCase()}/${parts[1].toLowerCase()}/${parts.slice(2).join("/")}`, request.url));
  }
}
