import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store/redux";
import { addTeacherToCourse, createNewNotification, editCourseStatus, editStudenStatus, editStudentMark, getCourseInfo, getMyCourses, signUpToCourse } from "src/modules/courses/thunk";
import { FullCourseDto } from "src/modules/courses/types";
import { CoursePageRenderer } from "./CoursePageRenderer";
import Swal from "sweetalert2";
import { getChangeStatusInputOptions } from "src/common/utils/DataUtil";
import { UserResponse } from "src/types/types";
import { getUser, getUsers } from "src/modules/user/thunk";
import { NotificationDto } from "src/modules/user/types";

const showRadioSwal = async (status: string): Promise<string> => {
    const result = await Swal.fire({
        title: "Изменить статус курса",
        input: "radio",
        inputValidator: (value) => {
            if (!value) {
                return "Выберите статус";
            }
        },
        inputOptions: getChangeStatusInputOptions(status || ""),
        inputPlaceholder: "Выберите статус",
        showCancelButton: true,
        confirmButtonText: "Изменить",
        cancelButtonText: "Отмена",
        allowOutsideClick: () => !Swal.isLoading()
    })
    return result.value
}

const showSelectTeacherSwal = async (people: UserResponse[]): Promise<string> => {
    const result = await Swal.fire({
        title: "Добавить преподавателя",
        input: "select",
        inputPlaceholder: "Выберите преподавателя",
        showCancelButton: true,
        confirmButtonText: "Изменить",
        cancelButtonText: "Отмена",
        allowOutsideClick: () => !Swal.isLoading(),
        inputOptions: {
            ...people.map(person => person.fullName)
        },
        inputValidator: (value) => {
            if (!value) {
                return "Выберите преподавателя";
            }
        },
    })
    return people[result.value as number]?.id.toString() || ""
}

const showMarkSwal = async (inputValue: string): Promise<string> => {
    const result = await Swal.fire({
        title: "Изменить оценку",
        input: "radio",
        inputOptions: {
            "Failed": "Не сдано",
            "NotDefined": "Не определено",
            "Passed": "Сдано",
        },
        inputPlaceholder: "Введите оценку",
        showCancelButton: true,
        confirmButtonText: "Изменить",
        cancelButtonText: "Отмена",
        inputValue: inputValue,
        allowOutsideClick: () => !Swal.isLoading()
    })
    return result.value || ""
}

const showNotificationSwal = async (): Promise<NotificationDto | null> => {
    const result = await Swal.fire({
        title: "Создать уведомление",
        input: "textarea",
        inputPlaceholder: "Введите текст уведомления",
        showCancelButton: true,
        confirmButtonText: "Создать",
        cancelButtonText: "Отмена",
        allowOutsideClick: () => !Swal.isLoading()
    })
    if (result.value) {
        const isImportant = await Swal.fire({
            title: "Важное уведомление",
            input: "radio",
            inputOptions: {
                "on": "Да",
                "off": "Нет"
            },
            inputValue: "off",
            inputPlaceholder: "Важное уведомление",
            showCancelButton: true,
            confirmButtonText: "Создать",
            cancelButtonText: "Отмена",
            allowOutsideClick: () => !Swal.isLoading()
        })
        if (isImportant.isConfirmed) {
            return {
                text: result.value,
                isImportant: (isImportant.value === "on") ? true : false
            }
        }
    }
    return null
}

export const CoursePage = () => {
    const id = useParams<{ id?: string }>();
    const dispatch = useAppDispatch();
    const [courseData, setCourseData] = useState<FullCourseDto | null>(null);
    const roles = useAppSelector((state) => state.user.roles)
    const [isRegistred, setIsRegistred] = useState(false);
    const [badgeValue, setBadgeValue] = useState(0);
    const [mainTeacher, setMainTeacher] = useState<UserResponse>({ id: "", fullName: "" });
    const [open, setOpen] = useState(false);
    const [isMainTeacher, setIsMainTeacher] = useState(false);

    const fetchCourse = useCallback(async (id: string) => {
        const response = await dispatch(getCourseInfo(id))
        console.log("fetchCourse", response)
        setCourseData(response)
    }, [dispatch])

    const checkIsRegistred = async () => {
        const response = await dispatch(getMyCourses())
        const isRegistred = response.some(course => course.id.toString() === id.id)
        setIsRegistred(isRegistred)
    }

    const fetchMainTeacher = async () => {
        const mainTeacher = courseData?.teachers.find(teacher => teacher.isMain);

        if (mainTeacher) {
            const users = await dispatch(getUsers()) || [];
            const userMainTeacher = users.find(user => user.fullName === mainTeacher.name) || { id: "", fullName: "" };
            setMainTeacher(userMainTeacher);

            const response = await dispatch(getUser()) || { email: "" };
            const isMain = courseData?.teachers.find(teacher => teacher.email === response.email && teacher.isMain);
            setIsMainTeacher(!!isMain);
        }
    };

    const handleCreateNotification = async () => {
        const result = await showNotificationSwal()
        console.log("Result", result)
        if (result !== null) {
            const response = await dispatch(createNewNotification(id.id || "", { text: result.text, isImportant: result.isImportant }))
            if (response) {
                await fetchCourse(id.id || "")
                Swal.fire("Успешно", "Уведомление создано", "success")
            } else {
                Swal.fire("Ошибка", "Произошла ошибка", "error")
            }
        }
    }
    const handleAddTeacher = async () => {
        const users = await dispatch(getUsers()) || [];
        const teacherNames = courseData?.teachers.map(teacher => teacher.name) ?? [];
        const studentNames = courseData?.students.map(student => student.name) ?? [];
        const filteredUsers = users.filter(user => !teacherNames.includes(user.fullName) && !studentNames.includes(user.fullName))
        const result = await showSelectTeacherSwal(filteredUsers);
        if (result) {
            console.log("Add teacher", result)
            const response = await dispatch(addTeacherToCourse(id.id || "", result))
            if (response) {
                await fetchCourse(id.id || "")
                Swal.fire("Успешно", "Преподаватель добавлен", "success")
            } else {
                Swal.fire("Ошибка", "Произошла ошибка", "error")
            }
        }

    }

    const handleOpenEditDialog = async () => {
        setOpen(true)
    }

    const handleCloseEditDialog = async (isEdited: boolean) => {
        setOpen(false)
        if (isEdited) {
            await fetchCourse(id.id || "")
        }
    }


    const handleChangeStatus = async () => {
        const result = await showRadioSwal(courseData?.status || "")
        if (result) {
            const response = await dispatch(editCourseStatus(id.id || "", result || ""))
            if (response) {
                await fetchCourse(id.id || "")
                Swal.fire("Успешно", "Статус изменен", "success")
            } else {
                Swal.fire("Ошибка", "Произошла ошибка", "error")
            }
        }
    }

    const handleAddStudent = async (studentId: string) => {
        const response = await dispatch(editStudenStatus(id.id || "", studentId, "Accepted"))
        if (response) {
            await fetchCourse(id.id || "")
            Swal.fire("Успешно", "Студент добавлен", "success")
        } else {
            Swal.fire("Ошибка", "Произошла ошибка", "error")
        }
    }

    const handleCancelStudent = async (studentId: string) => {
        const response = await dispatch(editStudenStatus(id.id || "", studentId, "Declined"))
        if (response) {
            await fetchCourse(id.id || "")
            Swal.fire("Успешно", "Студент отменен", "success")
        } else {
            Swal.fire("Ошибка", "Произошла ошибка", "error")
        }
    }

    const handleSignUpForCourse = async () => {
        const result = await Swal.fire({
            title: "Вы уверены?",
            text: "Вы хотите записаться на курс?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Да",
            cancelButtonText: "Отмена",
            allowOutsideClick: () => !Swal.isLoading()
        })
        if (result.isConfirmed) {
            await dispatch(signUpToCourse(id.id || ""))
            await checkIsRegistred()
            Swal.fire("Успешно", "Вы записаны на курс", "success")
        }
    }

    const handleChangeMidtermMark = async (studentId: string, mark: string) => {
        const result = await showMarkSwal(mark)
        if (result) {
            const response = await dispatch(editStudentMark(id.id || "", studentId, { markType: "Midterm", mark: result }))
            if (response) {
                await fetchCourse(id.id || "")
                Swal.fire("Успешно", "Оценка изменена", "success")
            } else {
                Swal.fire("Ошибка", "Произошла ошибка", "error")
            }
        }
    }

    const handleChangeFinalMark = async (studentId: string, mark: string) => {
        const result = await showMarkSwal(mark)
        if (result) {
            const response = await dispatch(editStudentMark(id.id || "", studentId, { markType: "Final", mark: result }))
            if (response) {
                await fetchCourse(id.id || "")
                Swal.fire("Успешно", "Оценка изменена", "success")
            } else {
                Swal.fire("Ошибка", "Произошла ошибка", "error")
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchCourse(id.id || "")
            await checkIsRegistred()

        }
        fetchData();
    }, [])

    useEffect(() => {
        if (courseData !== null) {
            const badgeValue = courseData.notifications.filter(notification => notification.isImportant).length
            setBadgeValue(badgeValue)
        }
    }, [])

    useEffect(() => {
        if (courseData !== null) {
            fetchMainTeacher()
        }
    }, [courseData])

    return (
        (
            ((roles.isAdmin || isMainTeacher) && mainTeacher.id === "") || courseData === null) ? null : (
            <CoursePageRenderer
                courseData={courseData}
                roles={roles}
                open={open}
                mainTeacher={mainTeacher}
                isMainTeacher={isMainTeacher}
                isRegistred={isRegistred}
                badgeValue={badgeValue}
                handleCreateNotification={handleCreateNotification}
                handleAddTeacher={handleAddTeacher}
                handleOpenEditDialog={handleOpenEditDialog}
                handleCloseEditDialog={handleCloseEditDialog}
                handleChangeStatus={handleChangeStatus}
                handleAddStudent={handleAddStudent}
                handleCancelStudent={handleCancelStudent}
                handleSignUpForCourse={handleSignUpForCourse}
                handleChangeMidtermMark={handleChangeMidtermMark}
                handleChangeFinalMark={handleChangeFinalMark}
            />
        )
    )

}
