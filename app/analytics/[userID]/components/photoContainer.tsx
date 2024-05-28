
import Image from "next/image"
export default function PhotoContainer(props:any){
    console.log(props.photo.photoURL);
    
    return(
        <div className="m-4 p-3 bg-blue-200 rounded inline-block">
            <Image
                src={props.photo.photoURL}
                height={400}
                width={300}
                alt=""
            />
            <h2 className=" font-medium">
                View count {props.photo.viewCount}
            </h2>
            <a href={`https://social-photo-manager-phi.vercel.app/photos/${props.photo.id}`}>{`https://social-photo-manager-phi.vercel.app/photos/${props.photo.id}`}</a>
        </div>
    )
}