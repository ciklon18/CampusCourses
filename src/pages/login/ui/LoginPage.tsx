import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../../../modules/auth/slice.ts";
import { routes } from "../../../common/const/routes.ts";
import { AppDispatch } from "../../../store/store.ts";
import { LoginForm } from "../components/LoginForm/LoginForm.tsx";
import { useEffect } from "react";
import { updateRolesState } from "src/modules/user/thunk.ts";




export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch()
  const isAuth = useSelector(isAuthenticated());
  
  
  useEffect(() => {
    if (isAuth) {
      navigate(routes.root());
      dispatch(updateRolesState());
    }
  }, [isAuth, navigate, dispatch]);

  return (
    <LoginForm />
  );
}

