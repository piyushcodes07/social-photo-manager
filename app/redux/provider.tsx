// "use client";

import { getCookie } from "cookies-next";
import { store } from "./store";
import { Provider, useDispatch } from "react-redux";
import { setData, setError, setLoading } from "./auth/authSlice";
import axios from "axios";
import { useEffect } from "react";



export async function Providers({ children }: { children: React.ReactNode }) {








  return <Provider store={store}>{children}</Provider>;
}