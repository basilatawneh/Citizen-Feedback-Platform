import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserInfo } from "../types/user.type";
import { RootState } from "./index";

const initialState: IUser = {
  info: {
    access_token: "",
    username: "",
    role: 0,
    id: "",
    full_name: ''
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserInfo>) => {
      console.log("Basil")
      state.info = action.payload;
    },
    print: (state, action: any) => {
      console.log("FDSFDSFSDFASD")
    }
  },
});

export const userAction = userSlice.actions;

export const userInfo = (state: RootState) => state.userInfo;

export default userSlice.reducer;
