import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";
// import { redirect } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const { email, password } = req.body;

    const validatorSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "email is invalid",
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "passord is not good",
      },
    ];

    const errors: string[] = [];

    validatorSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      var err = errors[0];
      res.status(400).json({
        errorMessage:err,
      });
    }
    const userWithEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      console.log(userWithEmail);
      

      if (!userWithEmail) {
       return res.status(401).json({
          errorMessage: "Email or password not valid",
        });
      }

      const isMatch = await bcrypt.compare(password,userWithEmail.password)

      if(!isMatch){
        return res.status(401).json({
          errorMessage:"User not found"
        })
      }

      const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
      )
      const alg = 'HS256'
      
      const jwt = await new jose.SignJWT({ email:userWithEmail.email })
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .sign(secret)
      
        setCookie('jwt',jwt,{req,res,maxAge: 60*6*24 })

     res.status(200).json({
      user:{
        id:userWithEmail.id,
        firstName:userWithEmail.first_name,
        lastName:userWithEmail.last_name,
        email:userWithEmail.email,
        redirect:true,
        targetUrl: '/main'
      }
        
      });




  }
}
