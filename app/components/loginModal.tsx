import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { sign } from "crypto";
import { selectError, selectLoading } from "../redux/auth/authSlice";
import auth from "../hooks/auth";
import { useSelector } from "react-redux";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
//   dispaitpay:"flex flex-wrap",
  bgcolor: "background.paper",
  height:"80vh",
  boxShadow: 24,
  p: 6,
};



export default function SignUpModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {signUpHook} = auth()
  const err = useSelector(selectError);

  const [disabled,setDisabled] = useState(true)
  const [signUp,setSignUp] = useState({
    fname:"",
    lname:"",
    email:"",
    password:""
  })

  useEffect(()=>{
    if(signUp.fname && signUp.lname && signUp.email  && signUp.password){
      setDisabled(false)
    }else{
      setDisabled(true)
    }

  },[signUp])

  function handelChange(e:any) {
    const name=e.target.name
    const value=e.target.value 

    setSignUp(()=>{
      return {
        ...signUp,
        [name]:value
      }
    })
  }

  const handelClick = () => {
    signUpHook(signUp.fname, signUp.lname,signUp.email,signUp.password,handleClose);
  };

  return (
    <div>
      <button onClick={handleOpen} className=" border p-1 px-4 rounded">
        Sign Up 
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="border-none"
      >
        <Box sx={style}>
        {err ? (
            <div className="mb-4">
              <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
               <strong>{err}</strong>
            </Alert>
            </div>
          ) : null}
          <h1 className="text-center uppercase bold pb-2 mb-2 border-b font-medium border-black">
            Create account
          </h1>
          <div>
            <h2 className="font-light text-center text-2xl">Create Your Oppentable Account</h2>
          </div>
          <div className="flex flex-row mt-5 gap-2">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="border-grey  border p-2 mt-2 rounded"
                name="fname"
                onChange={handelChange}
                value={signUp.fname}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="border-grey border p-2 mt-2 rounded"
                name="lname"
                onChange={handelChange}
                value={signUp.lname}
              />
            </div>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Email"
              className="border-grey w-full border p-2 mt-2 rounded"
              name="email"
              onChange={handelChange}
              value={signUp.email}
            />
          </div>
          <div className="flex flex-row gap-2"> 
          </div>
          <div>
          <input
                type="text"
                placeholder="Password"
                className="disabled w-full  border-grey  border p-2 mt-2 rounded"
                name="password"
                onChange={handelChange}
                value={signUp.password}
              />
            
          </div>
          <button onClick={handelClick} disabled={disabled} className="w-full text-center font-bold disabled:bg-slate-500 bg-red-600 text-white p-3 mt-4 rounded">
            SIGN IN
          </button>

          
          
        </Box>
      </Modal>
    </div>
  );
}
