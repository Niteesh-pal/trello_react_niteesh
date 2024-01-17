import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const checkListSlice = createSlice({
  name: 'checkList',
  initialState, 
  reducers: {
    getCheckListData: (state, action) => {
      return{...state, data:action.payload}
    },
    setCheckListData: (state, action) => {
      return { ...state, data: [...state.data, action.payload] };
    },
    deleteCheckList: (state, action) => {
      return {
        ...state,
        data: state.data.filter(({ id }) => id !== action.payload),
      };
    },
  },
});
export const {getCheckListData,setCheckListData,deleteCheckList} =
  checkListSlice.actions;

export default checkListSlice;
