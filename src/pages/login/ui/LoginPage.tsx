// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { isAuthenticated } from "../../../modules/auth/slice.ts";
// import { routes } from "../../../common/const/routes.ts";
// import { RootState } from "../../../store/store.ts";
import { LoginForm } from "../components/LoginForm/LoginForm.tsx";
// import { useEffect } from "react";




export const LoginPage = () => {
  // const navigate = useNavigate();
  // const isAuth = useSelector((state: RootState) =>
  //     isAuthenticated(state)
  // );
  
  // useEffect(() => {
  //   if (isAuth) {
  //     navigate(routes.root());
  //   }
  // }, [isAuth, navigate]);

  return (
    <LoginForm />
  );
}

