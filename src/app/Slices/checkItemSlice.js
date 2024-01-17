import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const checkItemSlice = createSlice({
  name: 'checkItem',
  initialState, // Corrected typo here
  reducers: {
    getData: (state, action) => {
      const uniqueItem = action.payload.filter(
        (newItem) =>
          !state.data.some((existItem) => existItem.id === newItem.id)
      );
      return {
        ...state,
        data: [...state.data, ...uniqueItem],
      };
    },

    setCheckItemData: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },

    setCheckItemCheckBox: (state, action) => {
      state.data.map((obj) => {
        if (obj.id === action.payload.id) {
          obj.state = action.payload.state;
        }
      });
    },

    deleteCheckItem: (state, action) => {
      return {
        ...state,
        data: state.data.filter(({ id }) => id !== action.payload),
      };
    },
  },
});
export const {
  getData,
  setCheckItemData,
  deleteCheckItem,
  setCheckItemCheckBox,
} = checkItemSlice.actions;

export default checkItemSlice;
