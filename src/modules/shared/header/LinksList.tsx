import { Link } from "react-router-dom";
import { routes } from "src/common/const/routes";
import style from "./Header.module.scss";
import { getUserRoles } from "src/modules/user/slice";
import { useEffect, useState } from "react";
import { UserRoles } from "src/types/types";
import { AppDispatch } from "src/store/store";
import { useDispatch } from "react-redux";

export const LinksList = () => {
    const dispatch: AppDispatch = useDispatch();


    const [roles, setRoles] = useState<UserRoles>({
        isTeacher: false,
        isStudent: false,
        isAdmin: false,
    });
    const fetchRoles = async () => {
        const response = await dispatch(getUserRoles())
        setRoles(
            {
                isTeacher: response.isTeacher,
                isStudent: response.isStudent,
                isAdmin: response.isAdmin,
            }
        )
    }

    useEffect(() => {
        fetchRoles()
    }, [dispatch]);


    return (
        <div className={style.links}>
            {roles.isStudent && (
                <Link to={routes.groups()} className={style.link}>
                    Группы курсов
                </Link>
            )}
            {roles.isStudent && (
                <Link to={routes.myCourses()} className={style.link}>
                    Мои курсы
                </Link>
            )}
            {roles.isTeacher && (
                <Link to={routes.teachingCourses()} className={style.link}>
                    Преподаваемые курсы
                </Link>
            )}
        </div>
    )
}