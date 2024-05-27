'use client'
import NavBar from "./components/NavBar";
import "./globals.css";
import { store } from "./redux/store";
import { Providers } from "./redux/provider";
import AuthContext from "./context/AuthContext";
import { cookies } from "next/headers";
import { useDispatch } from "react-redux";
import { setLoading, setError, setData } from "./redux/auth/authSlice";
import axios from "axios";
import { AnyARecord } from "dns";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  
  


  return (
    <html lang="en">

      <head />
      <body>
          <Providers>
          <main className="bg-gray-100  w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
              <NavBar />
            </main>
          </main>
          {children}

          </Providers>
          
     
      </body>
    </html>
  );
}
