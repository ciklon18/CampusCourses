import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface AuthState {
    token: string | null;
    isAuth: boolean;
}


const initialState: AuthState = {
    token: localStorage.getItem("token"),
    isAuth: localStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuth = true;
            localStorage.setItem("token", action.payload);
        },
        clearToken: (state) => {
            state.token = "";
            state.isAuth = false;
            localStorage.removeItem("token");
        },
    },
});


export default authSlice.reducer;
export const { setToken, clearToken } = authSlice.actions;
export const isAuthenticated = (state: RootState) => state.user.isAuth;