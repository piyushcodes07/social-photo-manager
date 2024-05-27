import { PrismaClient } from "@prisma/client"
import PhotoContainer from "./components/photoContainer"
const prisma =new PrismaClient()

const getPhotoAnalytics =  async(num:number)=>{
    const PhotoAnalytics = await prisma.user.findUnique({
        where:{
            id:num
        },
        select:{
            photos:true
        }
    })
    return PhotoAnalytics?.photos
}

export default async function Analytics(props:any){
    let id = props.params.userID
    var analytics = await getPhotoAnalytics(Math.floor(Number(id)))
    console.log(analytics);

    return(
        <div>
            {
                analytics?.map(photo=><PhotoContainer photo={photo}/>)
            }
        </div>
    )
}