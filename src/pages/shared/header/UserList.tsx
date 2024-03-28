import { Link } from "react-router-dom";
import { routes } from "src/common/const/routes";
import style from "./Header.module.scss";
import { useEffect, useState } from "react";
import { getUser, logoutUser } from "src/modules/user/thunk";
import { useAppDispatch, useAppSelector } from "src/store/redux";



export const UserList = () => {
    const dispatch = useAppDispatch();
    
    const handleLogout = () => {
        dispatch(logoutUser());
      };

    const [displayText, setDisplayText] = useState("Профиль");
    const fetchUser = async () => {
        try{
            const response = await dispatch(getUser())
            setDisplayText(response.email);
        } catch (error) {
            setDisplayText("Профиль");
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);


    const isAuth = useAppSelector((state) => state.auth.isAuth);
    if (isAuth) {
        fetchUser();
    }
    if (!isAuth) {
        return (
            <div className={style.links}>
                <Link to={routes.registration()} className={style.link}>Регистрация</Link>
                <Link to={routes.login()} className={style.link}>Вход</Link>
            </div>
        );
    }
    return (
        <div className={style.links}>
            <Link to={routes.profile()} className={style.link}>{displayText}</Link>
            <Link to={routes.root()} className={style.link} onClick={handleLogout}>Выйти</Link>
        </div>
    );
}