import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./users/loginUser";
import themeSlice from "./users/themeSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    theme: themeSlice,
  },
});

export default store;
