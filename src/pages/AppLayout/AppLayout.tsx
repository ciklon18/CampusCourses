import { CustomFooter } from "src/modules/shared/Footer/CustomFooter";
import { CustomHeader } from "../../modules/shared/header/CustomHeader";
import { Outlet } from "react-router-dom";
import style from './layout.module.scss'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const AppLayout = () => {

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={style.container}>
            <CustomHeader />
              <Outlet />
            <CustomFooter />
          </div>
      </LocalizationProvider>

    )
}