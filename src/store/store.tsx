import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "../modules/courses/slice";
import authSlice from "../modules/auth/slice";
import userSlice from "../modules/user/slice";
import groupsSlice from "../modules/group/slice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        courses: coursesSlice, 
        groups: groupsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
