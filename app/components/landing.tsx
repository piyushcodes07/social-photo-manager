'use client'

import { useSelector } from "react-redux"
import { selectData } from "../redux/auth/authSlice"
import AvatarUploadPage from "./uploader"
import SigninModal from "./modal"


export default function Landing(){
    const user = useSelector(selectData)
    
    if(user){
        console.log(user,"user from home");
        
        return(
        <div>
            {/* <h3>{`hello${user.user.id}`}</h3> */}
    <AvatarUploadPage/>
        </div>
        )
    }else{
        <SigninModal/>
    }
    
}