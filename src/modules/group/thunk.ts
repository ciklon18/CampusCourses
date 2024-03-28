import axios from "axios";
import { clearToken } from "../auth/slice";
import { Dispatch } from "@reduxjs/toolkit";
import { GroupDto } from "./types";
import { setGroups } from "./slice";


export const getGroups = () => async (dispatch: Dispatch): Promise<GroupDto[]> =>  {
    try {
        const response = await axios.get(
            "https://camp-courses.api.kreosoft.space/groups",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
        if (response.status === 401 || response.status === 403 || response.status === 400) {
            dispatch(clearToken());
            return []
        }
        setGroups(response.data)
        return response.data as GroupDto[]
    } catch (error) {
        console.error("Ошибка при получении групп", error)
        return []
    }
}

export const createGroup = (name: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(
            `https://camp-courses.api.kreosoft.space/groups`,
            { name: name },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 403 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        }
    } catch (error) {
        console.error("Ошибка при обновлении данных курса", error)
    }
}

export const editGroup = (data: GroupDto) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.put(
            `https://camp-courses.api.kreosoft.space/groups/${data.id}`,
            { name: data.name },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 403 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        }
    } catch (error) {
        console.error("Ошибка при обновлении данных курса", error)
    }
}

export const deleteGroup = (id: number) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.delete(
            `https://camp-courses.api.kreosoft.space/groups/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 403 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        }
    } catch (error) {
        console.error("Ошибка при удалении группы", error)
    }
}

