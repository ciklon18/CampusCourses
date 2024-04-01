import { Link } from "react-router-dom";
import { routes } from "src/common/const/routes";
import style from "./Header.module.scss";
import { useEffect } from "react";
import { updateRolesState } from "src/modules/user/thunk";
import { useAppDispatch, useAppSelector } from "src/store/redux";

export const LinksList = () => {
    const dispatch = useAppDispatch();
    const roles = useAppSelector((state) => state.user.roles);
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    useEffect(() => {
        const fetchRoles = async () => {
            await dispatch(updateRolesState());
        }
        fetchRoles();
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
