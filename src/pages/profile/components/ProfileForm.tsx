import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { getUser, updateUser } from "src/modules/user/slice";
import { AppDispatch } from "src/store/store";
import style from "./profile.module.scss";
import * as yup from 'yup';

const schema = yup.object().shape({
    fullName: yup.string()
        .required("ФИО обязательно для заполнения")
        .min(2, "ФИО должно содержать минимум 2 символа")
        .max(50, "ФИО должно содержать максимум 50 символов")
        .matches(/^[A-Za-zА-Яа-яЁё\s]+$/, "ФИО должно содержать только буквы"),
    birthDate: yup.date()
        .required("Дата рождения обязательна для заполнения")
        .max(new Date(), "Дата рождения не может быть больше текущей даты")
        .min(new Date('1900-01-01'), "Дата рождения не может быть меньше 1900 года")
});


export default function useProfileForm() {
    const dispatch: AppDispatch = useDispatch()

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        birthDate: ""
    })

    const [formError, setFormError] = useState({
        fullName: "",
        birthDate: "",
    })
    
    const fetchUser = async () => {
        const response = await dispatch(getUser)
        setFormData({
            fullName: response.fullName,
            email: response.email,
            birthDate: response.birthDate.split('T')[0]
        })
    }

    useEffect(() => {
        fetchUser()
    }, []);

    const handleSubmit = async () => {
        try {
            await schema.validate(formData, { abortEarly: false })
            dispatch(await updateUser(formData))
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newErrors = {} as any;
                error.inner.forEach((e: any) => {
                    newErrors[e.path] = e.message;
                });
                setFormError(newErrors)
            }
        }
    }

    return (
        <Container className={style.container}>
            <Typography variant="h4" className={style.text}>Профиль</Typography>
            <Form onSubmit={handleSubmit} className={style.form}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                    <Typography variant="body1">ФИО</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        id="fullName"
                        variant="outlined"
                        value={formData.fullName}
                        onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            setFormError({ ...formError, fullName: "" });
                        }}
                        error={formError.fullName !== ""}
                        helperText={formError.fullName}
                        className={style.form__input}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="body1">Email</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        id="email"
                        variant="outlined"
                        value={formData.email}
                        disabled={true}
                        className={style.form__input}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography variant="body1">Дата рождения</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                        id="birthDate"
                        variant="outlined"
                        value={formData.birthDate}
                        type="date"
                        onChange={(e) => {
                            setFormData({ ...formData, birthDate: e.target.value });
                            setFormError({ ...formError, birthDate: "" });
                        }}
                        error={formError.birthDate !== ""}
                        helperText={formError.birthDate}
                        className={style.form__input}
                    />
                </Grid>
                <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={style.form__button}
                    >
                        Обновить
                </Button>   
            </Grid>
            </Form>
        </Container>
    )
}

