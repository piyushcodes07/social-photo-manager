"use client";

import { Modal } from "@mui/material";
import Link from "next/link";
import SigninModal from "./modal";
import SignUpModal from "./loginModal";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import {
  selectData,
  selectError,
  setData,
  setError,
  setLoading,
} from "../redux/auth/authSlice";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import auth from "../hooks/auth";

export default function NavBar() {
  const router = useRouter()
  const user = useSelector(selectData);
  const err = useSelector(selectError);
  const dispatch = useDispatch();
  const { logOut } = auth();


  const getUser = async () => {
    try {
      const jwt: any = getCookie("jwt");
      console.log(jwt);

      if (!jwt) {
        dispatch(setError(null));
        dispatch(setData(null));
        dispatch(setLoading(false));
        return;
      }

      const response = await axios.get(`https://social-photo-manager-phi.vercel.app/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      console.log(response.data);

      dispatch(setData(response.data));
      dispatch(setError(null));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(error.response.data.errorMessage));
    }
  };
  function handelLogOut() {
    logOut();
  }
  // const[name,setName] =  useState(user?.firstName)
  useEffect(() => {
    getUser();
    console.log("hello");
    // dispatch((setError("hello")))
  }, []);
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {" "}
        Social Photo{" "}
      </Link>
      <div>
        {user ? (
          <div>
            <button onClick={() => router.push(`/analytics/${user.user.id}`)} className="mr-2 bg-green-400 rounded p-1 text-white px-3">
            {`analytics`}
              </button>{" "}
            <button
              onClick={handelLogOut}
              className=" border bg-blue-400 text-white p-1 px-4 rounded"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex gap-1">
            <SigninModal />
            <SignUpModal />
          </div>
        )}
      </div>
    </nav>
  );
}
