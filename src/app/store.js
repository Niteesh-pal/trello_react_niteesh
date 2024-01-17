import { configureStore } from '@reduxjs/toolkit';
import checkItemSlice from './Slices/checkItemSlice';
import checkListSlice from './Slices/checkListSlice';
import BoardSlice from './Slices/BoardSlice';
import listSlice from './Slices/ListSlices';
import cardSlice from './Slices/Card';

const store = configureStore({
  reducer: {
    board:BoardSlice.reducer,
    lists:listSlice.reducer,
    cards:cardSlice.reducer,
    checkItem: checkItemSlice.reducer,
    checkList:checkListSlice.reducer,

  },
});

export { store };