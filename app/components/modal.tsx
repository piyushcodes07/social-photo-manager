'use client'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { sign } from "crypto";
import { userAgent } from "next/server";
import auth from "../hooks/auth";
import { useSelector,useDispatch } from "react-redux";
import { selectError, selectLoading,selectData, setData, setError, setLoading } from "../redux/auth/authSlice";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { getCookie } from "cookies-next";
import axios from "axios";
import { setegid } from "process";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  //   dispaitpay:"flex flex-wrap",
  bgcolor: "background.paper",
  height: "80vh",
  boxShadow: 24,
  p: 6,
};

export default function SigninModal() {
  const err = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const user = useSelector(selectData)


  const { signIn } = auth();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [disabled, setDisabled] = useState(true);

  const [signin, setsignin] = useState({
    username: "",
    password: "",
  });

  function handelChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;

    setsignin(() => {
      return {
        ...signin,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (signin.username && signin.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [signin]);

  const handelClick = () => {
    signIn(signin.username, signin.password,handleClose);
  };

  

if(!user){
  return (
    <div>
        <Box sx={style}>
          {err ? (
            <div className="mb-4">
              <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
               <strong>{err}</strong>
            </Alert>
            </div>
          ) : null}
          {isLoading ? (
            <div className="h-[600px] w-16 flex justify-center justify-items-center py-24">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <div>
              {" "}
              <h1 className="text-center uppercase bold pb-2 mb-2 border-b font-medium border-black">
                SIGN IN {}
              </h1>
              <div>
                <h2 className="font-light text-center text-2xl">
                  Log Into Your Account
                </h2>
              </div>
              <div className="flex flex-row mt-5 gap-2">
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="border-grey  border p-2 mt-2 rounded"
                    name="username"
                    onChange={handelChange}
                    value={signin.username}
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Password"
                  className="disabled w-full  border-grey  border p-2 mt-2 rounded"
                  name="password"
                  onChange={handelChange}
                  value={signin.password}
                />
              </div>
              <button
                onClick={handelClick}
                disabled={disabled}
                className="w-full disabled:bg-slate-400 text-center font-bold bg-red-600 text-white p-3 mt-4 rounded"
              >
                Log In
              </button>
            </div>
          )}
        </Box>
    </div>
  )

}
  ;
}
