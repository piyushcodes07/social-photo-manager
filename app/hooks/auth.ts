import axios from "axios";
import { log } from "console";
import { setLoading, setError, setData } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { deleteCookie } from 'cookies-next';

export default function auth() {
  const dispatch = useDispatch();

  const signIn = async (
    email: string,
    password: string,
    handleClose: () => void
  ) => {
    console.log(email, password);
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log(response);

      dispatch(setLoading(false));
      dispatch(setData(response.data));
      dispatch(setError(null));
      handleClose();
    } catch (error: any) {
      console.log(error);

      dispatch(setLoading(false));
      dispatch(setError(error.response.data.errorMessage));
    }
  };
  const signUpHook = async (
    firstName:string,
    lastName:string,
    email: string,
    password: string,
    handleClose: () => void,
  ) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
            fname:firstName,lname:lastName,email:email,password:password
        }
      );
      console.log(response);

      dispatch(setLoading(false));
      dispatch(setData(response.data));
      dispatch(setError(null));
      handleClose();
    } catch (error: any) {
      console.log(error);

      dispatch(setLoading(false));
      dispatch(setError(error.response.data.errorMessage));
    }
    
  };

  const logOut= async ()=>{
    deleteCookie("jwt")
    dispatch(setData(null))
  }

  return {
    signIn,
    signUpHook,
    logOut
  };
}
