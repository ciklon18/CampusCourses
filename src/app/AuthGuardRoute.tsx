import { Navigate, useLocation } from "react-router-dom"
import { routes } from "../common/const/routes.ts"
import { useAppSelector } from "src/store/redux.ts";

export const AuthGuardRoute = () => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const location = useLocation()
    console.log("AuthGuardRoute", isAuth, location)
    if (!isAuth) {
        return <Navigate to={routes.login()} replace state={{ from: location }} />
    }
}


