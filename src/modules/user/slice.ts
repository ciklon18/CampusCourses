import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { LoginUserDto, UserDto, RegisterUserDto, ProfileDto } from "../../types/types";
import axios from "axios";
import { clearToken, setToken } from "../auth/slice";
import { AppDispatch } from "../../store/store";

export interface UserState {
    user: UserDto,
    error: string,
}

const initialState: UserState = {
    user: {
        email: "",
        password: "",
    },
    error: "",
};

export const loginUser = (data: LoginUserDto) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post(
            "https://camp-courses.api.kreosoft.space/login",
            data
        )
        dispatch(setToken(response.data.token))
        return response.data
    } catch (error) {
        console.error("Ошибка при логине", error);
    }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(
            "https://camp-courses.api.kreosoft.space/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch(clearToken());
        console.log("Результат логаута", response);
        return response.data
    } catch (error) {
        dispatch(clearToken());
        console.error("Ошибка при логауте", error)
    }
}

export const getUser = async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            "https://camp-courses.api.kreosoft.space/profile", 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401) {
            dispatch(clearToken());
            return { error: "Ошибка авторизации" }
        }
        dispatch(setUser(response.data))
        return response.data
    } catch (error) {
        console.error("Ошибка при получении данных пользователя", error)
        throw error
    }
}

export const updateUser = async (data: ProfileDto) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.put(
            "https://camp-courses.api.kreosoft.space/profile",
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch(setUser(response.data))
        return response.data
    } catch (error) {
        console.error("Ошибка при обновлении данных пользователя", error)
        throw error
    }
}

export const registerUser = (data: RegisterUserDto) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post(
            "https://camp-courses.api.kreosoft.space/registration",
            data
        );
        console.log("Зарегистрирован", response.data)
        dispatch(setToken(response.data.token))
        return response.data

    } catch (error) {
        console.error("Ошибка при регистрации", error);
        throw error
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
})

export const getUserState = (state: { user: UserState }) => state.user.user;

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
