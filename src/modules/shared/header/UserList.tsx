import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "src/common/const/routes";
import { isAuthenticated } from "src/modules/auth/slice";
import style from "./Header.module.scss";
import { logoutUser } from "src/modules/user/slice"
import { AppDispatch } from "src/store/store";



export const UserList = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
      };
    const isAuth = useSelector(isAuthenticated);
    return (!isAuth) ? (
        <div className={style.links}>
            <Link to={routes.registration()} className={style.link}>Регистрация</Link>
            <Link to={routes.login()} className={style.link}>Вход</Link>
        </div>
    ) :(
        <div className={style.links}>
            <Link to={routes.profile()} className={style.link}>Профиль</Link>
            <button onClick={handleLogout} className={style.button}>Выйти</button>
        </div>
    )
}