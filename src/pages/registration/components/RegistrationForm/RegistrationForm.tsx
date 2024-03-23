import { routes } from "../../../../common/const/routes";
import { registerUser } from "../../../../modules/user/slice";
import { AppDispatch } from "../../../../store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link, Form } from "react-router-dom";
import style from "./registration.module.scss";
import * as yup from 'yup';
import { Button, Container, IconButton, TextField, Typography } from "@material-ui/core";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const schema = yup.object().shape({
    fullName: yup.string()
        .required("ФИО обязательно для заполнения")
        .min(9, "ФИО должно содержать минимум 9 символов")
        .max(150, "ФИО должно содержать максимум 150 символов")
        .test('full-name', 'ФИО должно состоять из трех слов', (value) => {
            if (!value) return false;
            const words = value.split(" ");
            return words.length === 3; 
        })
        .matches(/^[A-Za-zА-Яа-яЁё\s]+$/, "ФИО должно содержать только буквы"),
    birthDate: yup.string()
        .required("Дата рождения обязательна для заполнения")
        .test('valid-date', 'Дата рождения не может быть позднее сегодняшней даты', function(value) {
            const today = new Date();
            const birthDate = new Date(value);
            return birthDate <= today;
        })
        .matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, "Некорректная дата рождения"),        
    email: yup.string()
        .required("Email обязателен для заполнения")
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i, "Некорректный email")
        .max(50, "Email должен содержать максимум 50 символов"),
    password: yup.string()
        .required("Пароль обязателен для заполнения")
        .min(6, "Пароль должен содержать минимум 6 символов")
        .max(50, "Пароль должен содержать максимум 50 символов")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Пароль должен содержать минимум одну букву и одну цифру"),
    confirmPassword: yup.string()
        .required("Подтверждение пароля обязательно для заполнения")
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
});

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch()

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        birthDate: "",
        password: "",
        confirmPassword: ""
      })
    

    const [formError, setFormError] = useState({
        fullName: "",
        birthDate: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateField = (field: string, value: string) => {
        try {
            schema.validateSyncAt(field, { [field]: value });
            return "";
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
            return "Ошибка валидации";
        }
    }

    const handleSubmit = async () => {
        try {
            await schema.validate(formData, { abortEarly: false })
            const res = await dispatch(registerUser(formData));
            if (res.error) {
                console.error("Register failed:", res);
            } else {
                console.log("Register success:", res);
                navigate(routes.root()); 
            }
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
        <Container className={style.formContainer} sx={{display: "flex",}}>
            <Form onSubmit={handleSubmit} className={style.form}>
                <Typography variant="h4" className={style.text}>Регистрация</Typography>

                <TextField
                    id="fullName"
                    variant="outlined"
                    value={formData.fullName}
                    onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        setFormError({ ...formError, fullName: validateField("fullName", e.target.value) });
                    }}
                    error={formError.fullName !== ""}
                    helperText={formError.fullName}
                    className={style.form__input}
                />
                <TextField
                    id="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setFormError({ ...formError, email: validateField("email", e.target.value) });
                    }}
                    error={formError.email !== ""}
                    helperText={formError.email}
                    className={style.form__input}
                />
                <TextField
                    id="birthDate"
                    variant="outlined"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => {
                        setFormData({ ...formData, birthDate: e.target.value });
                        setFormError({ ...formError, birthDate: validateField("birthDate", e.target.value) });
                    }}
                    error={formError.birthDate !== ""}
                    helperText={formError.birthDate}
                    className={style.form__input}
                />
                <TextField
                    id="password"
                    variant="outlined"
                    value={formData.password}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setFormError({ ...formError, password: validateField("password", e.target.value) });
                    }}
                    error={formError.password !== ""}
                    helperText={formError.password}
                    className={style.form__input}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        )
                    }}
                />
                <TextField
                    id="confirmPassword"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        setFormError({ ...formError, confirmPassword: (formData.password === e.target.value) ? "" : "Пароли не совпадают" });
                    }}
                    error={formError.confirmPassword !== ""}
                    helperText={formError.confirmPassword}
                    className={style.form__input}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        )
                    }}
                />
                <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={style.form__button}
                    >
                        Зарегистрироваться
                </Button>  
                <span className={style.bottom_link}>Уже есть аккаунт? <Link to={routes.login()} className={style.link}> Авторизуйтесь</Link></span>
            </Form>
        </Container>
    )
}


