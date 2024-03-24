import { Link } from "react-router-dom";
import { routes } from "src/common/const/routes";
import style from "./Header.module.scss";
import { getRolesState } from "src/modules/user/slice";
import { useEffect } from "react";
import { AppDispatch } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "src/modules/auth/slice";
import { updateRolesState } from "src/modules/user/thunk";

export const LinksList = () => {
    const dispatch: AppDispatch = useDispatch();
    const roles = useSelector(getRolesState())
    const isAuth = useSelector(isAuthenticated());

    useEffect(() => {
        dispatch(updateRolesState());
    }, [dispatch]);
    return (
        (isAuth) && <div className={style.links}>
            <Link to={routes.groups()} className={style.link}>
                Группы курсов
            </Link>
            {roles && roles.isStudent && (
                <Link to={routes.myCourses()} className={style.link}>
                    Мои курсы
                </Link>
            )}
            {roles && roles.isTeacher && (
                <Link to={routes.teachingCourses()} className={style.link}>
                    Преподаваемые курсы
                </Link>
            )}
        </div>
    )
}
