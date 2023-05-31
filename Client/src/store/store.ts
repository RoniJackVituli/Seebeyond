import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./User/User-slice";
import  checkTime  from '../utils/function/checkTime'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  preloadedState: {
    user: {
      user: localStorage.getItem("user")&&checkTime()
        ? JSON.parse(localStorage.getItem("user")!).user
        : null,
    },
  },
  
  
});
const expiresIn: number =  30 * 60 * 1000;

store.subscribe(() => {
  const { user } = store.getState();
  const expirationTime: number = new Date().getTime() + expiresIn;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("time", expirationTime.toString());
});



export type RootState = ReturnType<typeof store.getState>;
export default store;
