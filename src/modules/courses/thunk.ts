import axios from "axios";
import { clearToken } from "../auth/slice";
import { Dispatch } from "@reduxjs/toolkit";
import { CourceCreationDto } from "./types";

export const getCourses = (groupId: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(
            `https://camp-courses.api.kreosoft.space/groups/${groupId}`,
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
        return response.data
    } catch (error) {
        console.error("Ошибка при получении списка курсов", error)
    }
}

export const createCource = (id: string, request: CourceCreationDto) => async (dispatch: Dispatch) => {
    try {
        console.log("request", request)
        const response = await axios.post(
            `https://camp-courses.api.kreosoft.space/groups/${id}`,
            request,
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
        return response.data
    } catch (error) {
        console.error("Ошибка при создании курса", error)
    }
}