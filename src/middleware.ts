import Cookies from "js-cookie";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        '/account-branch/:path*',
        '/bill/:path*',
        '/billing/:path*',
        '/withdrawals/:path*',
        '/admin/:path*',
        '/cash-registry/:path*',
        '/cashwithdrawals/:path*',
        '/collections/:path*',
        '/operation/:path*',
        '/outdate-accounting/:path*',
        '/providers/:path*',
        '/seller-home/:path*',
        '/sellers/:path*'
    ]
}

export function middleware(request: NextRequest) {
    const cookies = Cookies.get('token')
    if (cookies) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}