import { configureStore } from "@reduxjs/toolkit";
import renesandroReducer from "./slice";

const store = configureStore({
  reducer: {
    renesandro: renesandroReducer,
  },
});

export default store;
