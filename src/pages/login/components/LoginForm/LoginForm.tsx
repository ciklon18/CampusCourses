import { routes } from "../../../../common/const/routes";
import { loginUser } from "../../../../modules/user/slice";
import { AppDispatch } from "../../../../store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import style from "./login.module.scss";


export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("submit");
        e.preventDefault();
        try {
          const res = await dispatch(loginUser(formData));
          if (res.type && !res.type.includes("rejected")) {
              console.error("Login failed:", res);
          } else {
              console.log("Login success:", res);
              navigate(routes.root()); 
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      }

    return (
        <div className={style.formContainer}>
            <form onSubmit={handleSubmit} className={style.form}>
                <h1>Авторизация</h1>
                <div className={style.inputContainer}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите свою почту"
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
                </div>
                <button type="submit" className={style.button}>Подтвердить</button>
                <span className={style.text}>Еще нет аккаунта? <u><Link to={routes.registration()} className={style.link}>Зарегистрируйтесь</Link></u></span>
            </form>
        </div>
    )
}


