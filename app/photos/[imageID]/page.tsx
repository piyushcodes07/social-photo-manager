import { PrismaClient } from "@prisma/client";
import Image from "next/image";
const prisma = new PrismaClient();

const getPhoto = async (num: number) => {
  const photo = await prisma.photo.update({
    where: {
      id: num,
    },
    data:{
        viewCount:{
            increment:1
        }
    }
  });
  return photo?.photoURL;
};

export default async function DisplayImage(props: any) {
  const id = props.params.imageID;
  var photo = await getPhoto(Number(id));
  console.log(photo);
    if(!photo){
        photo="https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
    }
  return (
    <div>
      <Image
        src={photo}
        fill={true}
        alt=""
      />
      {props.params.imageID}
    </div>
  );
}
