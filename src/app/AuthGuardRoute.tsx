import { Navigate, useLocation } from "react-router-dom"
import { routes } from "../common/const/routes.ts"
import { useSelector } from "react-redux";
import { isAuthenticated } from "../modules/auth/slice";

export const AuthGuardRoute = () => {
    const isAuth= useSelector(isAuthenticated);
    const location = useLocation()
    console.log("AuthGuardRoute", isAuth, location)
    if (!isAuth) {
        return <Navigate to={routes.login()} replace state={{ from: location }} />
    }
}


