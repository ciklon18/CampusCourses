import { useNavigate } from "react-router-dom";
import { routes } from "../../../common/const/routes.ts";
import { LoginForm } from "../components/LoginForm/LoginForm.tsx";
import { useEffect } from "react";
import { updateRolesState } from "src/modules/user/thunk.ts";
import { useAppDispatch, useAppSelector } from "src/store/redux.ts";




export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  
  
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

