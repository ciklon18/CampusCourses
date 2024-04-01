import axios from "axios";
import { clearToken } from "../auth/slice";
import { Dispatch } from "@reduxjs/toolkit";
import { CourceCreationDto, CourceDescriptionDto, CourseDto, EditCourseDto, FullCourseDto, MarkDto } from "./types";
import { NotificationDto } from "../user/types";

export const getCourses = (groupId: string) => async (dispatch: Dispatch): Promise<CourseDto[] | []>=> {
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
            return []
        } 
        return response.data as CourseDto[]
    } catch (error) {
        console.error("Ошибка при получении списка курсов", error)
        return []
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

export const getMyCourses = () => async (dispatch: Dispatch): Promise<CourseDto[] | []> => {
    try {
        const response = await axios.get(
            `https://camp-courses.api.kreosoft.space/courses/my`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return []
        } 
        return response.data as CourseDto[]
    } catch (error) {
        console.error("Ошибка при получении списка моих курсов", error)
        return []
    }
}


export const getTeachingCourses = () => async (dispatch: Dispatch): Promise<CourseDto[] | []> => {
    try {
        const response = await axios.get(
            `https://camp-courses.api.kreosoft.space/courses/teaching`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return []
        } 
        return response.data as CourseDto[]
    } catch (error) {
        console.error("Ошибка при получении списка преподаваемых курсов", error)
        return []
    }
}



export const getCourseInfo = (id: string) => async (dispatch: Dispatch): Promise<FullCourseDto | null> => {
    try {
        const response = await axios.get(
            `https://camp-courses.api.kreosoft.space/courses/${id}/details`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return null
        } 
        return response.data as FullCourseDto
    } catch (error) {
        console.error("Ошибка при получении деталей курса", error)
        return null
    }
}


export const editCourseStatus = (id: string, status: string) => async (dispatch: Dispatch) => {
    try {
        console.log("request", status)
        const response = await axios.post(
            `https://camp-courses.api.kreosoft.space/courses/${id}/status`,
            {
                status: status
            },
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
        console.error("Ошибка при изменении статуса курса", error)
    }
}

export const signUpToCourse = (id: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(
            `https://camp-courses.api.kreosoft.space/courses/${id}/sign-up`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        } 
        return response.data
    } catch (error) {
        console.error("Ошибка при записи на курс", error)
    }
}


export const editStudenStatus = (id: string, studentId: string, status: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post(
            `https://camp-courses.api.kreosoft.space/courses/${id}/student-status/${studentId}`,
            {
                status: status
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        } 
        return response.data
    } catch (error) {
        console.error("Ошибка при изменении статуса студента", error)
    }
}

export const createNewNotification = (id: string, request: NotificationDto) => async (dispatch: Dispatch) => {
    try {
        console.log("request", request)
        const response = await axios.post(
            `https://camp-courses.api.kreosoft.space/courses/${id}/notifications`,
            {
                text: request.text,
                isImportant: request.isImportant
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        } 
        return response.data
    } catch (error) {
        console.error("Ошибка при создании уведомления", error)
    }
}


export const editStudentMark = (id: string, studentId: string, request: MarkDto) => async (dispatch: Dispatch) => {
    try {
        console.log("request", request)
        const response = await axios.post(
            `https://camp-courses.api.kreosoft.space/courses/${id}/marks/${studentId}`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        } 
        return response.data
    } catch (error) {
        console.error("Ошибка при изменении оценки студента", error)
    }
}


export const editCourseRequirementsAndAnnotations = (id: string, request: CourceDescriptionDto) => async (dispatch: Dispatch) => {
    try {
        console.log("request", request)
        const response = await axios.put(
            `https://camp-courses.api.kreosoft.space/courses/${id}/requirements-and-annotations`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        } 
        return response.data
    } catch (error) {
        console.error("Ошибка при изменении требований и аннотаций курса", error)
    }
}

export const editCourse = (id: string, request: EditCourseDto) => async (dispatch: Dispatch): Promise<boolean> => {
    try {
        console.log("request", request)
        const response = await axios.put(
            `https://camp-courses.api.kreosoft.space/courses/${id}`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        console.log("response", response)

        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return false
        } 
        if (response.status === 403 || response.status === 405) {
            return false
        }
        return true
    } catch (error) {
        console.error("Ошибка при изменении курса", error)
        return false
    }
}

export const addTeacherToCourse = (id: string, teacherId: string) => async (dispatch: Dispatch) => {
    try {
        console.log("request", teacherId)
        const response = await axios.post(
            `https://camp-courses.api.kreosoft.space/courses/${id}/teachers`,
            {
                userId: teacherId
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        } 
        return response.data
    } catch (error) {
        console.error("Ошибка при добавлении преподавателя курса", error)
    }
}


export const deleteCourse = (id: string) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.delete(
            `https://camp-courses.api.kreosoft.space/courses/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.status === 401 || response.status === 400) {
            dispatch(clearToken());
            return response.data
        } 
        return response.data
    } catch (error) {
        console.error("Ошибка при удалении курса", error)
    }
}