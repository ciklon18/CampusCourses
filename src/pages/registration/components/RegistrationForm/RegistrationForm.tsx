import { routes } from "../../../../common/const/routes";
import { registerUser } from "../../../../modules/user/slice";
import { AppDispatch } from "../../../../store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import style from "./registration.module.scss";

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

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("submit");
        e.preventDefault();
        try {
          const res = await dispatch(registerUser(formData));
          if (res.type && !res.type.includes("rejected")) {
              console.error("Register failed:", res);
          } else {
              console.log("Register success:", res);
              navigate(routes.root()); 
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      }

    return (
        <div className={style.formContainer}>
            <form onSubmit={handleSubmit} className={style.form}>
                <h1>Регистрация</h1>
                <div className={style.inputContainer}>
                    <input
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Введите свое ФИО"
                        className={style.input}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите свою почту"
                        className={style.input}
                    />
                    <input
                        type="date"
                        name="birthDate"
                        onChange={handleChange}
                        placeholder="Введите свой день рождения"
                        className={style.input}
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите свой пароль"
                        className={style.input}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Подтвердите свой пароль"
                        className={style.input}
                    />
                </div>
                <button type="submit" className={style.button}>Зарегистрироваться</button>
                <span className={style.text}>Уже есть аккаунт? <u><Link to={routes.login()} className={style.link}>Авторизуйтесь</Link></u></span>
            </form>
        </div>
    )
}


