import { NextApiResponse, NextApiRequest } from "next";
import validator from 'validator';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import * as jose from 'jose'
import { setCookie } from "cookies-next";
export default async function handler(

  req: NextApiRequest,
  res: NextApiResponse
) {
 
    const prisma =new PrismaClient()
  if (req.method === "POST") {
    const { fname,lname,email,password } = req.body;

    const validatorSchema = [
        {
            valid:validator.isLength(fname,{
                min:1,
                max:30
            }),
            errorMessage:"First name is inValid"
        },
        {
            valid:validator.isLength(lname,{
                min:1,
                max:30
            }),
            errorMessage:"Last name is inValid"
        },
        
    
        {
            valid:validator.isStrongPassword(password),
            errorMessage:"Password is not strong"
        }
    ]

    var errors:string[] = []

    validatorSchema.forEach((valids)=>{
        if(!valids.valid){
            errors.push(valids.errorMessage)
        }
    })

    if(errors.length){
        var err = errors[0]
        res.status(400).json({
            errorMessage:err
        })
    }

    const isUserEmail = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(isUserEmail){
        res.status(400).json({
            errorMessage:"Email already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await prisma.user.create({
      data:{
        first_name:fname,
        last_name:lname,
        password:hashedPassword,
        email:email
      }
    })

    const secret = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
      )
      const alg = 'HS256'
      
      const jwt = await new jose.SignJWT({ email:user.email })
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .sign(secret)
      
    setCookie('jwt',jwt,{req,res,maxAge: 60*6*24 })

    res.status(200).json({
        user,
    });
  
  }
}
