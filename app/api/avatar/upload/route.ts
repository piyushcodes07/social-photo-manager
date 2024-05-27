import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { log } from 'console';

export async function POST(request: Request): Promise<NextResponse> {


    const prisma = new PrismaClient()
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const userId = Number(searchParams.get('id'))
  console.log("user id",userId);
  
    console.log("");
    

  if(filename&&request.body){
    console.log("i ran");
    
    const blob = await put(filename, request.body, {
        access: 'public',
      });
    
 
    console.log(blob.url,userId);
    
    const prismaPhoto = await prisma.photo.create({
        data:{
          photoURL:blob.url,
          userID:(userId),
          viewCount:0
        }
      })   
      console.log(prismaPhoto);
      
      return NextResponse.json({blob,prismaPhoto});
  }
  else{
    return NextResponse.json({"error":"bad request"})
  }
 
}

