import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  loading: false,
  error: false,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    onLoading: (state) => {
      return {
        ...state,
        loading: true,
        error: false,
        open: false,
      };
    },

    onError: (state) => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },

    toggleOpen: (state, action) => {
      return {
        ...state,
        open: action.payload,
      };
    },

    setLists: (state, action) => {
      return {
        ...state,
        lists: action.payload,
        loading: false,
        error: false,
      };
    },

    addList: (state, action) => {
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    },

    deleteList: (state, action) => {
      const newData = state.lists.filter(({ id }) => id !== action.payload);
      return {
        ...state,
        lists: newData,
      };
    },
  },
});
export const { onLoading, onError, setLists, toggleOpen, addList, deleteList } =
  listSlice.actions;

export default listSlice;
