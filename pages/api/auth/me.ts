import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

                                              
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers["authorization"] as string;

  const tokenFinal = token.split(" ")[1];
  
  const load =   jwt.decode(tokenFinal) as {email: string} ;

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where:{
        email:load.email
    },
    select:{
        id:true,
        first_name:true,
        last_name:true,
        email:true

    }
  })


  return res.status(200).json({
    user,
  });
}
