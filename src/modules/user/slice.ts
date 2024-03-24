import {  createSlice } from "@reduxjs/toolkit";
import {  UserDto, UserRoles } from "../../types/types";


export interface UserState {
    user: UserDto,
    error: string,
    roles: UserRoles
}

const initialState: UserState = {
    user: {
        email: "",
        password: "",
    },
    error: "",
    roles: {
        isTeacher: false,
        isStudent: false,
        isAdmin: false
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setRoles: (state, action) => {
            state.roles = action.payload; 
        },
    },
});

export default userSlice.reducer;
export const { setUser, setRoles } = userSlice.actions;

export const getUserState = () => (state: { user: UserState }) => state.user.user;
export const getRolesState = () => (state: { user: UserState }) => state.user.roles;
