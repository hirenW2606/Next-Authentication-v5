import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    authRoutes,
} from "@/routes"

const { auth } = NextAuth(authConfig); 

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedin = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return null; 
    }

    if(isAuthRoute){
        if(isLoggedin){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if(!isLoggedin && !isPublicRoute){
        return Response.redirect(new URL('/auth/login', nextUrl))
    }

    return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}   