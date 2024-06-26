
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import { selectData } from '../redux/auth/authSlice';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import Image from 'next/image';


export default function AvatarUploadPage() {

  
  const userId  = useSelector(selectData).user.id

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<any | null>(null);
  
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Upload Image</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/avatar/upload?filename=${file.name}&id=${userId}`,
            {
              method: 'POST',
              body: file,
            
            }
          );

          const newBlob = (await response.json()) ;
          console.log(newBlob);
          
         

          setBlob(newBlob);
        }}
        className="flex flex-col space-y-4" // Improved form layout and spacing
      >
        <div className="flex items-center">
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            required
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" // Clear styling and improved focus handling
          />
          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700" // Actionable button style
          >
            Upload
          </button>
        </div>
        {blob && (
          <div className=' p-3 bg-blue-300 rounded'>
            <span className="text-gray-700 mr-2">Blob url:</span>
            <a href={`https://social-photo-manager-phi.vercel.app/photos/${blob.prismaPhoto.id}`} className="text-blue-500 hover:underline">
            {`https://social-photo-manager-phi.vercel.app/photos/${blob.prismaPhoto.id}`}
            </a>
            <Image
            className='mt-2'
            src={blob.blob.url}
            width={400}
            height={400}
            alt=''
            />
          </div>
        )}
      </form>
    </>
  );
}
