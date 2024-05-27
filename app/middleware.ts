import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function middleware(req:NextRequest,res:NextResponse) {
       
  const token = req.headers.get("authorization") as string;
  if (!token) {
    return new NextResponse(JSON.stringify({errorMessage:"Unauthorized"}))
  }

  const tokenFinal = token.split(" ")[1];

  const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  );

  try {
    await jose.jwtVerify(tokenFinal, secret);
  } catch (error) {
    return new NextResponse(JSON.stringify({errorMessage:"Unauthorized"}))
  }
//   const load =   jwt.decode(tokenFinal) as {email: string} ;

}

export const config = {
    matcher:["/api/auth/me"],
}