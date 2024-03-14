import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/login/ui/LoginPage.tsx";
import { AppLayout } from "../pages/AppLayout/AppLayout.tsx";
import { routes } from "../common/const/routes.ts";
import { RegistrationPage } from "src/pages/registration/ui/RegistrationPage.tsx";
import { ProfilePage } from "src/pages/profile/ui/ProfilePage.tsx";

export const router = createBrowserRouter([
    {
        path: routes.root(),
        element: <AppLayout />,
        children: [
            { path: routes.login(), element: <LoginPage /> },
            { path: routes.registration(), element: <RegistrationPage /> },
            { path: routes.profile(), element: <ProfilePage /> },
            { path: routes.groups(), element: <div>Groups</div> },
            { path: routes.myCourses(), element: <div>My courses</div> },
            { path: routes.teachingCourses(), element: <div>Teaching courses</div> },
        ]
    }
])
