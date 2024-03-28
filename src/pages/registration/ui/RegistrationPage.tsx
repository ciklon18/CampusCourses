import { useNavigate } from "react-router-dom";
import { routes } from "../../../common/const/routes.ts";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm.tsx";
import { useEffect } from "react";
import { useAppSelector } from "src/store/redux.ts";




export const RegistrationPage = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  
  useEffect(() => {
    if (isAuth) {
      navigate(routes.root());
    }
  }, [isAuth, navigate]);

  return (
    <RegistrationForm />
  );
}

