import { createSlice } from "@reduxjs/toolkit";

const initialState={
    card:{},
    loading:false,
    error:false,
    open:false
}

const cardSlice = createSlice({
    name:"cards",
    initialState,
    reducers:{
        onLoading:(state)=>{
            return{
                ...state,
                loading:true,
                error:false,
            }
        },
        onError:(state)=>{
            return{
                ...state,
                loading:false,
                error:true
            }
        },
        toggleOpen:(state,action)=>{
            return{
                ...state,
                open:action.payload
            }
        }
    }
})

const {onLoading, onError, toggleOpen} = cardSlice.actions

export default cardSlice;