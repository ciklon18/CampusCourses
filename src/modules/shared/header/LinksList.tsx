import { Link } from "react-router-dom";
import { routes } from "src/common/const/routes";
import style from "./Header.module.scss";

export const LinksList = () => {
    return (
        <div className={style.links}>
            <Link to={routes.groups()} className={style.link}>Группы курсов</Link>
            <Link to={routes.myCourses()} className={style.link}>Мои курсы</Link>
            <Link to={routes.teachingCourses()} className={style.link}>Преподаваемые курсы</Link>
        </div> 
    )
}