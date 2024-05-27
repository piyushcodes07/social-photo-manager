'use client'

import { useSelector } from "react-redux"
import { selectData } from "../redux/auth/authSlice"
import AvatarUploadPage from "./uploader"
import SigninModal from "./modal"


export default function Landing(){
    const user = useSelector(selectData)
    
    if(user){
        return(
        <div>
    <AvatarUploadPage/>
        </div>
        )
    }else{
        <SigninModal/>
    }
    
}