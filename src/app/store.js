import { configureStore } from "@reduxjs/toolkit";
import checkListReducer from "../feature/checkList/checkListSlice";

export const store = configureStore({
        reducer:checkListReducer
})