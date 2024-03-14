import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/login/ui/LoginPage.tsx";
import { AppLayout } from "../pages/AppLayout/AppLayout.tsx";
import { routes } from "../common/const/routes.ts";
import { RegistrationPage } from "src/pages/registration/ui/RegistrationPage.tsx";

export const router = createBrowserRouter([
    {
        path: routes.root(),
        element: <AppLayout />,
        children: [
            { path: routes.login(), element: <LoginPage /> },
            { path: routes.registration(), element: <RegistrationPage /> },
            { path: routes.profile(), element: <div>Profile</div> },
            { path: routes.groups(), element: <div>Groups</div> },
            { path: routes.myCourses(), element: <div>My courses</div> },
            { path: routes.teachingCourses(), element: <div>Teaching courses</div> },
        ]
    }
])
