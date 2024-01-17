import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: [],
};

const BoardSlice = createSlice({
  name: 'checkItem',
  initialState, // Corrected typo here
  reducers: {
        setBoards:(state,action)=>{
            
            return {...state,board:action.payload}
        },
        addBoard:(state,action)=>{
            return{...state, board:[...state.board,action.payload]}
        }
  },
});
export const {setBoards,addBoard} = BoardSlice.actions;

export default BoardSlice;
