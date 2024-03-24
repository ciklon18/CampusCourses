import { CustomFooter } from "src/pages/shared/Footer/CustomFooter";
import { CustomHeader } from "../shared/header/CustomHeader";
import { Outlet } from "react-router-dom";
import style from './layout.module.scss'
import { useEffect } from "react";
import { AppDispatch } from "src/store/store";
import { useDispatch } from "react-redux";
import { updateRolesState } from "src/modules/user/thunk";

export const AppLayout = () => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(updateRolesState());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <CustomHeader />
        <Outlet />
      <CustomFooter />
    </div>
  )
}