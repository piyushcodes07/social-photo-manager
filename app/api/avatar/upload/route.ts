import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request: Request): Promise<NextResponse> {


    const prisma = new PrismaClient()
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const userId = Number(searchParams.get('id'))
    console.log("");
    
  // ⚠️ The below code is for App Router Route Handlers only
  if(filename&&request.body){
    console.log("i ran");
    
    const blob = await put(filename, request.body, {
        access: 'public',
      });
    
      // Here's the code for Pages API Routes:
      // const blob = await put(filename, request, {
      //   access: 'public',
      // });
    console.log(blob.url,userId);
    
    const prismaPhoto = await prisma.photo.create({
        data:{
          photoURL:blob.url,
          userID:Math.floor(userId),
          viewCount:0
        }
      })   
      console.log(prismaPhoto);
      
      return NextResponse.json(blob);
  }
  else{
    return NextResponse.json({"error":"bad request"})
  }
 
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
