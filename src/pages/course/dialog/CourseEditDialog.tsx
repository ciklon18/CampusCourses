import { Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Modal, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";
import style from "./dialog.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from "formik";
import Swal from "sweetalert2"
import { Fragment, useEffect, useState } from "react";
import { useAppDispatch } from "src/store/redux";
import { Form } from "react-router-dom";
import * as yup from 'yup';
import { UserResponse, UserRoles } from "src/types/types";
import { getUsers } from "src/modules/user/thunk";
import { FullCourseDto } from "src/modules/courses/types";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { editCourse } from "src/modules/courses/thunk";

const schema = yup.object().shape({
    name: yup.string().required("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(50, "Максимум 50 символов")
        .matches(/^[A-Za-zА-Яа-яЁё\s]+$/, "Только буквы"),
    startYear: yup.number().required("Обязательное поле")
        .min(2000, "Минимум 2000 год")
        .max(2029, "Максимум 2029 год"),
    maximumStudentsCount: yup.number().required("Обязательное поле")
        .min(1, "Минимум 1 место")
        .max(200, "Максимум 200 мест"),
    semester: yup.string().required("Обязательное поле")
        .oneOf(["Spring", "Autumn"], "Выберите семестр"),
    requirements: yup.string().required("Обязательное поле"),
    annotations: yup.string().required("Обязательное поле"),
    mainTeacherId: yup.string().required("Обязательное поле")
})

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['code'],
];


export const CourseEditDialog = ({ courseData, mainTeacher, roles, isMainTeacher, open, handleCloseEditDialog }: { courseData: FullCourseDto, mainTeacher: UserResponse, roles: UserRoles, isMainTeacher: boolean, open: boolean, handleCloseEditDialog: (isEdited: boolean) => void }) => {
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState<UserResponse[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await dispatch(getUsers());
            setUsers(response);
            console.log("Пользователи получены", response)
            console.log("mainTeacher", mainTeacher)
        }

        if (!roles.isAdmin && !isMainTeacher && open) {
            Swal.fire({
                title: "Ошибка",
                text: "У вас нет прав для создания курса",
                icon: "error",
            });
            handleCloseEditDialog(false)
        } else {
            fetchUsers();
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            name: courseData?.name || "",
            startYear: courseData?.startYear || 2022,
            maximumStudentsCount: courseData?.maximumStudentsCount || 200,
            semester: courseData?.semester || "Spring",
            requirements: courseData?.requirements || "",
            annotations: courseData?.annotations || "",
            mainTeacherId: mainTeacher.id || "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            console.log(values.requirements);
            const response = await dispatch(editCourse(courseData?.id.toString() || "", values));

            if (!response) {
                handleCloseEditDialog(false);

                Swal.fire({
                    title: "Ошибка",
                    text: "Ошибка при редактировании курса",
                    icon: "error",
                });
            } else {
                handleCloseEditDialog(true);

                Swal.fire({
                    title: "Успешно",
                    text: "Курс успешно отредактирован",
                    icon: "success",
                });
            }
            formik.resetForm();
        },
    });

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleCloseEditDialog}
            >
                <Box className={style.modalWindow}>
                    <Box className={style.modalHeader}>
                        <Typography
                            variant="h4"
                            className={style.modalTitle}>
                            Редактирование курса
                        </Typography>
                        <CloseIcon
                            onClick={() => handleCloseEditDialog(false)}
                            className={style.closeIcon} />
                    </Box>

                    <Form onSubmit={formik.handleSubmit} className={style.modalForm}>
                        {roles.isAdmin &&
                            <TextField
                                label="Название"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className={style.modalInput}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />}
                        {roles.isAdmin &&
                            <TextField
                                label="Дата начала"
                                name="startYear"
                                type="number"
                                value={formik.values.startYear}
                                onChange={formik.handleChange}
                                className={style.modalInput}
                                error={formik.touched.startYear && Boolean(formik.errors.startYear)}
                                helperText={formik.touched.startYear && formik.errors.startYear}
                            />}
                        {roles.isAdmin &&
                            <TextField
                                label="Количество мест"
                                name="maximumStudentsCount"
                                type="number"
                                value={formik.values.maximumStudentsCount}
                                onChange={formik.handleChange}
                                className={style.modalInput}
                                error={formik.touched.maximumStudentsCount && Boolean(formik.errors.maximumStudentsCount)}
                                helperText={formik.touched.maximumStudentsCount && formik.errors.maximumStudentsCount}
                            />}
                        {(roles.isAdmin || isMainTeacher) &&
                            <ReactQuill
                                theme="snow"
                                value={formik.values.requirements}
                                onChange={(value) => formik.setFieldValue("requirements", value)}
                                modules={{ toolbar: toolbarOptions }}
                                className={style.quillContainer}>
                            </ReactQuill>}
                        {(roles.isAdmin || isMainTeacher) &&

                            <ReactQuill
                                theme="snow"
                                value={formik.values.annotations}
                                onChange={(value) => formik.setFieldValue("annotations", value)}
                                modules={{ toolbar: toolbarOptions }}
                                className={style.quillContainer}
                            >
                            </ReactQuill>}
                        {roles.isAdmin &&
                            <TextField
                                label="Преподаватель"
                                select
                                name="mainTeacher"
                                value={formik.values.mainTeacherId}
                                onChange={(e) => formik.setFieldValue("mainTeacherId", e.target.value)}
                                className={style.modalInput}
                                error={formik.touched.mainTeacherId && Boolean(formik.errors.mainTeacherId)}
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.fullName}
                                    </MenuItem >
                                ))}
                            </TextField>
                        }
                        {roles.isAdmin &&
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    Семестр
                                </FormLabel>
                                <RadioGroup
                                    aria-label="semester"
                                    name="semester"
                                    value={formik.values.semester}
                                    onChange={formik.handleChange}
                                    className={style.radioContainer}
                                >
                                    <FormControlLabel
                                        value="Autumn"
                                        control={<Radio />}
                                        label="Осенний"
                                        className={style.radioItem} />
                                    <FormControlLabel
                                        value="Spring"
                                        control={<Radio />}
                                        label="Весенний"
                                        className={style.radioItem} />
                                </RadioGroup>
                            </FormControl>}
                        <Box className={style.modalButtonContainer}>
                            <Button onClick={() => handleCloseEditDialog(true)} className={style.cancelButton}>
                                Отмена
                            </Button>
                            <Button type="submit" className={style.submitButton}>
                                Редактировать
                            </Button>
                        </Box>
                    </Form>
                </Box>
            </Modal>
        </Fragment>
    )
}