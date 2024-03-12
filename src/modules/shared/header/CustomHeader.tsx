import { routes } from "../../../common/const/routes"
import { Link } from "react-router-dom"
import style from "./Header.module.scss"
import { LinksList } from "./LinksList"
import { UserList } from "./UserList"


export const CustomHeader = () => {
    return (
        <header className={style.header}>
            <div className={style.root}>
                <Link to={routes.root()} className={style.root__link}>Кампусные курсы</Link>
            </div>
            <LinksList />   
            <UserList />
        </header>
    )
}