import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../../modules/auth/slice.ts";
import { routes } from "../../../common/const/routes.ts";
import { RootState } from "../../../store/store.ts";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm.tsx";
import { useEffect } from "react";




export const RegistrationPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) =>
      isAuthenticated(state)
  );
  
  useEffect(() => {
    if (isAuth) {
      navigate(routes.root());
    }
  }, [isAuth, navigate]);

  return (
    <RegistrationForm />
  );
}

