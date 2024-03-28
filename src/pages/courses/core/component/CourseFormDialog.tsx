import { Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Modal, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";
import style from "../courses.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from "formik";
import { createCource } from "src/modules/courses/thunk";
import Swal from "sweetalert2"
import { Fragment, useEffect, useState } from "react";
import { useAppDispatch } from "src/store/redux";
import { Form } from "react-router-dom";
import * as yup from 'yup';
import { UserResponse } from "src/types/types";
import { getUsers } from "src/modules/user/thunk";
import { CourceCreationDto } from "src/modules/courses/types";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const initialValues: CourceCreationDto = {
    name: "",
    startYear: 2024,
    maximumStudentsCount: 200,
    semester: "Autumn",
    requirements: "",
    annotations: "",
    mainTeacherId: "",
};

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
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['code'],                                         
];

export const CourseFormDialog = ({ open, onClose, id }: { open: boolean, onClose: () => void, id: string }) => {
    const dispatch = useAppDispatch();

    const [users, setUsers] = useState<UserResponse[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await dispatch(getUsers());
            if (!response.error) {
                setUsers(response);
                console.log("Пользователи получены", response)
            }
        }
        fetchUsers();
    }, [dispatch, open]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: async (values) => {
            console.log(values.requirements);
            const response = await dispatch(createCource(id, values));
            if (response.error) {
                Swal.fire({
                    title: "Ошибка",
                    text: "Ошибка при создании курса",
                    icon: "error",
                });
            } else {
                onClose();
                formik.resetForm();
                Swal.fire({
                    title: "Успешно",
                    text: "Курс успешно создан",
                    icon: "success",
                });
            }
        },
    });

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box className={style.modalWindow}>
                    <Box className={style.modalHeader}>
                        <Typography
                            variant="h4"
                            className={style.modalTitle}>
                            Создание курса
                        </Typography>
                        <CloseIcon
                            onClick={onClose}
                            className={style.closeIcon} />
                    </Box>

                    <Form onSubmit={formik.handleSubmit} className={style.modalForm}>
                        <TextField
                            label="Название"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className={style.modalInput}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            label="Дата начала"
                            name="startYear"
                            type="number"
                            value={formik.values.startYear}
                            onChange={formik.handleChange}
                            className={style.modalInput}
                            error={formik.touched.startYear && Boolean(formik.errors.startYear)}
                            helperText={formik.touched.startYear && formik.errors.startYear}
                        />
                        <TextField
                            label="Количество мест"
                            name="maximumStudentsCount"
                            type="number"
                            value={formik.values.maximumStudentsCount}
                            onChange={formik.handleChange}
                            className={style.modalInput}
                            error={formik.touched.maximumStudentsCount && Boolean(formik.errors.maximumStudentsCount)}
                            helperText={formik.touched.maximumStudentsCount && formik.errors.maximumStudentsCount}
                        />
                        <ReactQuill
                            theme="snow"
                            value={formik.values.requirements}
                            onChange={(value) => formik.setFieldValue("requirements", value)}
                            modules={{ toolbar: toolbarOptions }}
                            className={style.quillContainer}>
                        </ReactQuill>
                        <ReactQuill
                            theme="snow"
                            value={formik.values.annotations}
                            onChange={(value) => formik.setFieldValue("annotations", value)}
                            modules={{ toolbar: toolbarOptions}}
                            className={style.quillContainer}
                        >                           
                        </ReactQuill> 
                        <TextField
                            label="Основной преподаватель курса"
                            name="mainTeacherId"
                            select
                            value={formik.values.mainTeacherId}
                            onChange={formik.handleChange}
                            className={style.modalInput}
                            error={formik.touched.mainTeacherId && Boolean(formik.errors.mainTeacherId)}
                            helperText={formik.touched.mainTeacherId && formik.errors.mainTeacherId}
                        >
                            {users.map((user) => (
                                <MenuItem
                                    key={user.id}
                                    value={user.id}
                                    className={style.menuItem}>
                                    {user.fullName}
                                </MenuItem>
                            ))}
                        </TextField>
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
                        </FormControl>
                        <Box className={style.modalButtonContainer}>
                            <Button onClick={onClose} className={style.cancelButton}>
                                Отмена
                            </Button>
                            <Button type="submit" className={style.submitButton}>
                                Создать
                            </Button>
                        </Box>
                    </Form>
                </Box>
            </Modal>
        </Fragment>
    )
}