import { clearToken, setToken } from "../auth/slice";
import { AppDispatch } from "../../store/store";
import { Dispatch } from "@reduxjs/toolkit";
import { LoginUserDto,  RegisterUserDto, ProfileDto, UserResponse } from "../../types/types";
import { setRoles, setUser } from "./slice";
import axios from "axios";


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

export const getUser = () => async (dispatch: Dispatch): Promise<ProfileDto | null> => {
    try {
        const response = await axios.get(
            "https://camp-courses.api.kreosoft.space/profile", 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 403 || response.status === 400) {
            dispatch(clearToken());
            return null
        }
        return response.data as ProfileDto
    } catch (error) {
        console.error("Ошибка при получении данных пользователя", error)
        dispatch(clearToken());
        return null
    }

}

export const updateUser = (data: ProfileDto) => async (dispatch: Dispatch) => {
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
        if (response.status === 401) {
            dispatch(clearToken());
            return { error: "Ошибка авторизации" }
        } else if (response.status === 400) {
            return { error: "Ошибка валидации" }
        }
        dispatch(setUser(response.data))
        return response.data
    } catch (error) {
        console.error("Ошибка при обновлении данных пользователя", error)
    }
}

export const registerUser = (data: RegisterUserDto) => async (dispatch: Dispatch) => {
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
    }
}

export const updateRolesState = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            "https://camp-courses.api.kreosoft.space/roles",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 403 || response.status === 400) {
            dispatch(clearToken())
        }
        console.log("Роли получены", response.data)
        dispatch(setRoles(response.data))

    } catch (error) {
        console.error("Ошибка при получении ролей", error);
        dispatch(clearToken())
    }
}


export const getUsers = () => async (dispatch: Dispatch): Promise<UserResponse[]> => {
    try {
        const response = await axios.get(
            "https://camp-courses.api.kreosoft.space/users",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken())
            return []
        }
        return response.data as UserResponse[]
    } catch (error) {
        console.error("Ошибка при получении пользователей", error);
        return []
    }
}