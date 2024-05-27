
import { Inter } from '@next/font/google';


import { PrismaClient } from '@prisma/client';
import SigninModal from './components/modal';
import AvatarUploadPage from './components/uploader';
import Landing from './components/landing';
const inter = Inter({ subsets: ['latin'] });

const prisma = new PrismaClient()

export default async function Home() {

  
  return (
    <main>
      <main>
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
          <Landing/>
          
          
        
        </div>
      </main>
    </main>
  );
}
