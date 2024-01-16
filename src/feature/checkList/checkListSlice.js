import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: false,
  open: false,
};


export const checkListSlice = createSlice({
    name:"chekList",
    initialState,

    reducers:{
        toggleOpen:(state,action)=>{
            return{...state,open:action.payload}
        }
    }
})

export const {toggleOpen} = checkListSlice.actions

export default checkListSlice.reducer;