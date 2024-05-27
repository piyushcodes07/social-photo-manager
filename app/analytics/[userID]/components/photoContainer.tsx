
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
            <a href={`http://localhost:3000/photos/${props.photo.id}`}>{`http://localhost:3000/photos/${props.photo.id}`}</a>
        </div>
    )
}