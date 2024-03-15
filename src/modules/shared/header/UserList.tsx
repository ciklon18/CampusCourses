import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "src/common/const/routes";
import { isAuthenticated } from "src/modules/auth/slice";
import style from "./Header.module.scss";
import {   getUser, logoutUser } from "src/modules/user/slice"
import { AppDispatch } from "src/store/store";
import { useEffect, useState } from "react";



export const UserList = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
      };

    const [displayText, setDisplayText] = useState("Профиль");
    const fetchUser = async () => {
        const response = await dispatch(getUser)
        setDisplayText(response.email);
    }

    useEffect(() => {
        fetchUser()
    }, []);


    const isAuth = useSelector(isAuthenticated);
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