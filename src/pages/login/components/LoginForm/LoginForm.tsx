import { loginUser, updateRolesState } from "../../../../modules/user/slice";
import { routes } from "../../../../common/const/routes";
import { AppDispatch } from "../../../../store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link, Form } from "react-router-dom";
import style from "./login.module.scss";
import * as yup from 'yup';
import { Button, Container, IconButton, TextField, Typography } from "@material-ui/core";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const schema = yup.object().shape({  
    email: yup.string()
        .required("Email обязателен для заполнения")
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i, "Некорректный email")
        .max(50, "Email должен содержать максимум 50 символов"),
    password: yup.string()
        .required("Пароль обязателен для заполнения")
        .min(6, "Пароль должен содержать минимум 6 символов")
        .max(50, "Пароль должен содержать максимум 50 символов")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Пароль должен содержать минимум одну букву и одну цифру")
});

export const LoginForm = () => {
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
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);

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
            const res = await dispatch(loginUser(formData));
            if (res.error) {
                console.error("Login failed:", res);
            } else {
                console.log("Login success:", res);
                dispatch(updateRolesState());
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
                <Typography variant="h4" className={style.text}>Авторизация</Typography>
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
                <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={style.form__button}
                    >
                        Войти
                </Button>  
                <span className={style.bottom_link}>Еще нет аккаунта? <Link to={routes.registration()} className={style.link}>Зарегистрируйтесь</Link></span>
            </Form>
        </Container>
    )
}


