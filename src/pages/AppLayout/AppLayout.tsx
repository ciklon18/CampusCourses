import { CustomFooter } from "src/modules/shared/Footer/CustomFooter";
import { CustomHeader } from "../../modules/shared/header/CustomHeader";
import { Outlet } from "react-router-dom";
import style from './layout.module.scss'

export const AppLayout = () => {

    return (
        <div className={style.container}>
          <CustomHeader />
            <Outlet />
          <CustomFooter />
        </div>
    )
}