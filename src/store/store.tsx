import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "../modules/courses/slice";
import authSlice from "../modules/auth/slice";

export const store = configureStore({
    reducer: {
        user: authSlice,
        courses: coursesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;