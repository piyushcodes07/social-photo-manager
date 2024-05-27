import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface User{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    
}

export interface authSlice {
  loading:boolean,
  data:any | null,
  error:string | null
}

const initialState: authSlice = {
  loading:false,
  data:null,
  error:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    setError:(state,action:PayloadAction<string | null>)=>{
        state.error = action.payload
    },
    setData:(state,action:PayloadAction<User | null>)=>{
        state.data = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLoading,setError,setData} = authSlice.actions

export const selectLoading = (state: RootState) => state.auth.loading
export const selectError = (state: RootState) => state.auth.error
export const selectData = (state: RootState) => state.auth.data


export default authSlice.reducer